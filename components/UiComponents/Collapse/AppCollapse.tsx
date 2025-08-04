"use client"
import React from 'react'
import { ArrowUpIcon } from '../../../assets/svgs/Icons'
import { Collapse } from 'antd'

const AppCollapse = ({items}:{items:any}) => {
  return (
    <Collapse 
        items={items} 
        expandIconPosition="end"
        bordered={false}
        expandIcon={() => <ArrowUpIcon className="rotate-180 *:stroke-primary" />}
        />
  )
}

export default AppCollapse
