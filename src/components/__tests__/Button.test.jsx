import {render , screen} from '@testing-library/react'
import Button from '../Button'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('button' , ()=>{
    test('renders the label prop as button text' ,()=>{
         render(<Button label="Submit"/>)
    expect(screen.getByRole('button' , {name:/submit/i})).toBeInTheDocument();

    })

    test('calls onClick when clicked' , async ()=>{
        const handleClick = jest.fn();
        const user = userEvent.setup();
        render(<Button label='Click me' onClick={handleClick}/>)
        await user.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).toHaveBeenCalledTimes(1)
        
    })

    test('shows disabled state when disabled prop is true' , ()=>{
         render(<Button label="Submit" disabled={true}/>)
         expect(screen.getByRole('button')).toBeDisabled();
    })
   

})
