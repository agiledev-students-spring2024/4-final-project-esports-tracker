import { Link, useLocation } from "react-router-dom"
import "./TabSwitcher.css"

const TabSwitcher = ({ firstTab, secondTab }) => {
  const location = useLocation()

  return (
    <>
      <div className="tab-switcher-container">
        <div className="tab-switcher">
          <Link to={firstTab.path}>
            <div className={`tab-item ${location.pathname === firstTab.path ? "tab-active" : ""}`}>
              {firstTab.name}
            </div>
          </Link>
          <Link to={secondTab.path}>
            <div className={`tab-item ${location.pathname === secondTab.path ? "tab-active" : ""}`}>
              {secondTab.name}
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TabSwitcher
