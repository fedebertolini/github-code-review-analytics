import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const options = [
    { label: "Last month", months: 1 },
    { label: "Last 3 months", months: 3 },
    { label: "Last 6 months", months: 6 },
    { label: "Last year", months: 12 },
    { label: "No time filter", months: null },
];

const Filters = ({ numberOfMonths, setNumberOfMonths }) => (
    <Segment textAlign='center' basic>
        <Button.Group>
            {options.map(option => (
                <Button
                    key={option.months}
                    content={option.label}
                    basic={option.months !== numberOfMonths}
                    onClick={() => setNumberOfMonths(option.months)}
                    primary
                />
            ))}
        </Button.Group>
    </Segment>
);

export default Filters;
