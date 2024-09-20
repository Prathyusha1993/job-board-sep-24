import React from 'react'

const JobPosting = ({url, title, by, time}) => {
    const formatedTime = new Date(time * 1000).toLocaleString();
  return (
    <div className='post' role='listItem'>
        <h2 className='post-title'><a href={url} target='_blank' rel='noopener' className={url ? '' :'inactiveLink'}>{title}</a></h2>
        <span className='post-metadata'>
            By {by} - {formatedTime}
        </span>
    </div>
  )
}

export default JobPosting;