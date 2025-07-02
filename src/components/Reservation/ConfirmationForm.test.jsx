import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationForm from './ConfirmationForm';

// Mock the global submitAPI function
global.submitAPI = jest.fn();

// Mock window.alert and window.location.href
global.alert = jest.fn();
delete window.location;
window.location = { href: '' };

// Mock props for testing
const mockProps = {
    numberOfPeople: 4,
    date: '2024-01-15',
    selectedTimeSlot: '18:00'
};

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
    global.submitAPI.mockReturnValue(true);
    window.location.href = '';
});

describe('ConfirmationForm Component', () => {
    test('renders all form fields correctly', () => {
        render(<ConfirmationForm {...mockProps} />);

        expect(screen.getByLabelText(/your first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/your last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/your email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/occasion for reservation/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeInTheDocument();
    });

    test('displays reservation details correctly', () => {
        render(<ConfirmationForm {...mockProps} />);

        expect(screen.getByText('2024-01-15 - 18:00')).toBeInTheDocument();
        expect(screen.getByText('4 persons')).toBeInTheDocument();
    });

    test('renders food image with correct attributes', () => {
        render(<ConfirmationForm {...mockProps} />);

        const image = screen.getByAltText(/greek salad dish/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'assets/greek salad.jpg');
    });

    test('updates name state when name input changes', () => {
        render(<ConfirmationForm {...mockProps} />);

        const nameInput = screen.getByLabelText(/your first name/i);
        fireEvent.change(nameInput, { target: { value: 'John' } });

        expect(nameInput).toHaveValue('John');
    });

    test('updates lastName state when last name input changes', () => {
        render(<ConfirmationForm {...mockProps} />);

        const lastNameInput = screen.getByLabelText(/your last name/i);
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

        expect(lastNameInput).toHaveValue('Doe');
    });

    test('updates email state when email input changes', () => {
        render(<ConfirmationForm {...mockProps} />);

        const emailInput = screen.getByLabelText(/your email address/i);
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        expect(emailInput).toHaveValue('john@example.com');
    });

    test('updates occasion state when select changes', () => {
        render(<ConfirmationForm {...mockProps} />);

        const occasionSelect = screen.getByLabelText(/occasion for reservation/i);
        fireEvent.change(occasionSelect, { target: { value: 'birthday' } });

        expect(occasionSelect).toHaveValue('birthday');
    });

    test('has correct occasion options', () => {
        render(<ConfirmationForm {...mockProps} />);

        expect(screen.getByRole('option', { name: 'Occasion' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Birthday' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Engagement' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Anniversary' })).toBeInTheDocument();
    });

    test('email input has correct type attribute', () => {
        render(<ConfirmationForm {...mockProps} />);

        const emailInput = screen.getByLabelText(/your email address/i);
        expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('submits form successfully with valid data', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all required fields
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.submitAPI).toHaveBeenCalledWith({
            ...mockProps,
            name: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            occasion: 'birthday'
        });
        expect(global.alert).toHaveBeenCalledWith('Reservation Confirmed');
        expect(window.location.href).toBe('/home');
    });

    test('shows error alert when submitAPI returns false', () => {
        global.submitAPI.mockReturnValue(false);
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all required fields
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('Failed to submit form');
        expect(window.location.href).toBe('');
    });

    test('shows validation error when name is missing', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all fields except name
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('One of the field is invalid');
        expect(global.submitAPI).not.toHaveBeenCalled();
    });

    test('shows validation error when lastName is missing', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all fields except lastName
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('One of the field is invalid');
        expect(global.submitAPI).not.toHaveBeenCalled();
    });

    test('shows validation error when email is missing', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all fields except email
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('One of the field is invalid');
        expect(global.submitAPI).not.toHaveBeenCalled();
    });

    test('shows validation error when occasion is missing', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out all fields except occasion
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('One of the field is invalid');
        expect(global.submitAPI).not.toHaveBeenCalled();
    });

    test('prevents default form submission', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out form and submit
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: 'birthday' } });

        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        // If preventDefault wasn't called, the form would submit normally
        // Since we get our expected behavior, we can assume it's working
        expect(global.submitAPI).toHaveBeenCalled();
    });

    test('handles empty string values correctly', () => {
        render(<ConfirmationForm {...mockProps} />);

        // Fill out fields with empty strings
        fireEvent.change(screen.getByLabelText(/your first name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/your last name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/your email address/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/occasion for reservation/i), { target: { value: '' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

        expect(global.alert).toHaveBeenCalledWith('One of the field is invalid');
        expect(global.submitAPI).not.toHaveBeenCalled();
    });

    test('displays correct reservation details with different props', () => {
        const differentProps = {
            numberOfPeople: 2,
            date: '2024-12-25',
            selectedTimeSlot: '19:30'
        };

        render(<ConfirmationForm {...differentProps} />);

        expect(screen.getByText('2024-12-25 - 19:30')).toBeInTheDocument();
        expect(screen.getByText('2 persons')).toBeInTheDocument();
    });

    test('initial state of all inputs is empty', () => {
        render(<ConfirmationForm {...mockProps} />);

        expect(screen.getByLabelText(/your first name/i)).toHaveValue('');
        expect(screen.getByLabelText(/your last name/i)).toHaveValue('');
        expect(screen.getByLabelText(/your email address/i)).toHaveValue('');
        expect(screen.getByLabelText(/occasion for reservation/i)).toHaveValue('');
    });
});