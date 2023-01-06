// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, isActive, updateLanguage} = props
  const {id, language} = itemDetails
  console.log(isActive)
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onChangeLanguage = () => {
    updateLanguage(id)
  }

  return (
    <li>
      <button type="button" onClick={onChangeLanguage} className={btnClassName}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
