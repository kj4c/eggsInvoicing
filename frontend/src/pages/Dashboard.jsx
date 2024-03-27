import React from 'react'
import './Dashboard.css'
import { Button } from '../components'
import { cardData } from '../data/dashboardData'


const Dashboard = () => {
  return (
    <div className='mt-12'>
      <div className='Dashboard lg-flex-nowrap'>
        <div className='Dashboard-banner lg-w-80'>
          <div className='Dashboard-Banner-Content'>
            <div>
              <p className='Dashboard-Earnings'>FY2024 Earnings</p>
              <p className='Dashboard-Earnings-Content'>$63,448.78</p>
            </div>
          </div>
          <div className='mt-6'>
            <Button
              color="white"
              bgColor="blueviolet"
              text="Download Report"
              borderRadius="10px"
            />
          </div>
        </div>

        <div className='Dashboard-Card-Container '>
          {cardData.map((item) => (
            <div key={item.title} className='Dashboard-Card-Style md-w-56'>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="Dashboard-Card-Button-Style"
              >
                {item.icon}
              </button>
              <p style={{marginTop: '0.75rem'}}>
                <span className="">ammount</span>
              </p>
              <p className="Dashboard-Card-Title">{item.title}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard