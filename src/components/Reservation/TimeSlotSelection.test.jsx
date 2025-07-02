import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeSlotSelection from './TimeSlotSelection';

// Mock props for testing
const mockProps = {
    timeSlots: ['17:00', '17:30', '18:00', '18:30', '19:00'],
    numberOfPeople: 4,
    setNumberOfPeople: jest.fn(),
    date: '2024-01-15',
    setDate: jest.fn(),
    selectedTimeSlot: '',
    setSelectedTimeSlot: jest.fn(),
    setDisplayForm: jest.fn()
};

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

describe('TimeSlotSelection Component', () => {
    test('renders all form fields correctly', () => {
        render(<TimeSlotSelection {...mockProps} />);

        expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();
    });

    test('displays correct initial values', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const numberInput = screen.getByLabelText(/number of people/i);
        const dateInput = screen.getByLabelText(/reservation date/i);

        expect(numberInput).toHaveValue(4);
        expect(dateInput).toHaveValue('2024-01-15');
    });

    test('renders all time slots as buttons', () => {
        render(<TimeSlotSelection {...mockProps} />);

        mockProps.timeSlots.forEach(slot => {
            expect(screen.getByRole('button', { name: `Select time slot ${slot}` })).toBeInTheDocument();
        });
    });

    test('calls setNumberOfPeople when number input changes', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const numberInput = screen.getByLabelText(/number of people/i);
        fireEvent.change(numberInput, { target: { value: '6' } });

        expect(mockProps.setNumberOfPeople).toHaveBeenCalledWith('6');
    });

    test('calls setDate when date input changes', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const dateInput = screen.getByLabelText(/reservation date/i);
        fireEvent.change(dateInput, { target: { value: '2024-02-20' } });

        expect(mockProps.setDate).toHaveBeenCalledWith('2024-02-20');
    });

    test('calls setSelectedTimeSlot when time slot button is clicked', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const timeSlotButton = screen.getByRole('button', { name: 'Select time slot 18:00' });
        fireEvent.click(timeSlotButton);

        expect(mockProps.setSelectedTimeSlot).toHaveBeenCalledWith('18:00');
    });

    test('applies selected styling to chosen time slot', () => {
        const propsWithSelectedSlot = {
            ...mockProps,
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...propsWithSelectedSlot} />);

        const selectedButton = screen.getByRole('button', { name: 'Select time slot 18:00' });
        expect(selectedButton).toHaveStyle({
            backgroundColor: '#F4CE14',
            color: 'white',
            border: 'solid 1px white'
        });
    });

    test('applies default styling to unselected time slots', () => {
        const propsWithSelectedSlot = {
            ...mockProps,
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...propsWithSelectedSlot} />);

        const unselectedButton = screen.getByRole('button', { name: 'Select time slot 17:00' });
        expect(unselectedButton).toHaveStyle({
            backgroundColor: '#F4CE14',
            color: 'black'
        });
    });

    test('calls setDisplayForm when Reserve button is clicked with valid data', () => {
        const validProps = {
            ...mockProps,
            numberOfPeople: 4,
            date: '2024-01-15',
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...validProps} />);

        const reserveButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(reserveButton);

        expect(mockProps.setDisplayForm).toHaveBeenCalledWith(true);
    });

    test('does not call setDisplayForm when numberOfPeople is 0', () => {
        const invalidProps = {
            ...mockProps,
            numberOfPeople: 0,
            date: '2024-01-15',
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...invalidProps} />);

        const reserveButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(reserveButton);

        expect(mockProps.setDisplayForm).not.toHaveBeenCalled();
    });

    test('does not call setDisplayForm when numberOfPeople is 20 or more', () => {
        const invalidProps = {
            ...mockProps,
            numberOfPeople: 20,
            date: '2024-01-15',
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...invalidProps} />);

        const reserveButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(reserveButton);

        expect(mockProps.setDisplayForm).not.toHaveBeenCalled();
    });

    test('does not call setDisplayForm when date is empty', () => {
        const invalidProps = {
            ...mockProps,
            numberOfPeople: 4,
            date: '',
            selectedTimeSlot: '18:00'
        };

        render(<TimeSlotSelection {...invalidProps} />);

        const reserveButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(reserveButton);

        expect(mockProps.setDisplayForm).not.toHaveBeenCalled();
    });

    test('does not call setDisplayForm when selectedTimeSlot is empty', () => {
        const invalidProps = {
            ...mockProps,
            numberOfPeople: 4,
            date: '2024-01-15',
            selectedTimeSlot: ''
        };

        render(<TimeSlotSelection {...invalidProps} />);

        const reserveButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(reserveButton);

        expect(mockProps.setDisplayForm).not.toHaveBeenCalled();
    });

    test('number input has correct min and max attributes', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const numberInput = screen.getByLabelText(/number of people/i);
        expect(numberInput).toHaveAttribute('min', '1');
        expect(numberInput).toHaveAttribute('max', '20');
        expect(numberInput).toHaveAttribute('type', 'number');
    });

    test('date input has correct type attribute', () => {
        render(<TimeSlotSelection {...mockProps} />);

        const dateInput = screen.getByLabelText(/reservation date/i);
        expect(dateInput).toHaveAttribute('type', 'date');
    });

    test('handles empty timeSlots array gracefully', () => {
        const emptyTimeSlotsProps = {
            ...mockProps,
            timeSlots: []
        };

        render(<TimeSlotSelection {...emptyTimeSlotsProps} />);

        // Should still render the form fields and reserve button
        expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();

        // But no time slot buttons should be present
        const allButtons = screen.getAllByRole('button');
        // Only the Reserve button should be present
        expect(allButtons).toHaveLength(1);
        expect(allButtons[0]).toHaveTextContent(/reserve/i);
    });
});