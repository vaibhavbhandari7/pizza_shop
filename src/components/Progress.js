import React, { Component } from 'react';

import { Steps } from 'antd';
const { Step } = Steps;

const Progress = ({current}) => {
    return (
        <Steps current={current}>
            <Step title="Menue" description="Select Your Meal" />
            <Step title="Checkout" description="Review Your Order" />
            <Step title="Success" description="On its way" />
        </Steps>
    )
}

export default Progress;