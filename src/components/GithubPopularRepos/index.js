import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    reposData: [],
    activeTabId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeTabId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        imageUrl: eachItem.avatar_url,
      }))

      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateLanguage = id => {
    this.setState(
      {
        activeTabId: id,
      },
      this.getRepos,
    )
  }

  renderFilterItems = () => {
    const {activeTabId} = this.state
    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachFilterItem => (
          <LanguageFilterItem
            key={eachFilterItem.id}
            itemDetails={eachFilterItem}
            updateLanguage={this.updateLanguage}
            isActive={eachFilterItem.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  renderReposList = () => {
    const {reposData} = this.state
    console.log(reposData)

    return (
      <ul className="repositories-list">
        {reposData.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    console.log(activeTabId)

    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderFilterItems()}
          {this.renderRepos()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
