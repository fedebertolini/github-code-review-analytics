import React from 'react';
import { Step, Icon } from 'semantic-ui-react';

const isCompleted = (currentStep, thisStep) => currentStep > thisStep;
const isActive = (currentStep, thisStep) => currentStep === thisStep;
const isDisabled = (currentStep, thisStep) => currentStep < thisStep;

const steps = [
    {
        icon: 'building',
        title: 'Organization'
    },
    {
        icon: 'book',
        title: 'Repositories'
    },
    {
        icon: 'users',
        title: 'Users'
    },
];

const Header = ({ currentStep }) => (
    <Step.Group>
        {steps.map((step, index) => (
            <Step
                key={index}
                completed={isCompleted(currentStep, index)}
                active={isActive(currentStep, index)}
                disabled={isDisabled(currentStep, index)}
            >
                <Icon name={step.icon} />
                <Step.Content title={step.title} />
            </Step>
        ))}
    </Step.Group>
);

export default Header;
