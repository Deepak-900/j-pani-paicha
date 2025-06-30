import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    to = '#',           // Default link target
    type = 'button',    // Button type (button, submit, etc.)
    onClick,            // Click handler
    children,           // Button content
    className = '',     // Additional classes
    variant = 'primary', // Button variant
    size = 'md',        // Button size
    outline = false,    // Outline style
    fullWidth = false,  // Full width button
    disabled = false,   // Disabled state
    hiddenOnMobile = false, // Hide on mobile
    visibleOnMobile = true, // Show on mobile (alternative approach)
}) => {
    // Base button classes
    const baseClasses = 'btn';

    // Variant classes
    const variantClass = outline ? `btn-outline btn-${variant}` : `btn-${variant}`;

    // Size classes
    const sizeClass = `btn-${size}`;

    // Responsive classes
    const responsiveClass = hiddenOnMobile ? 'hidden sm:flex' : '';

    // Full width class
    const widthClass = fullWidth ? 'w-full' : '';

    // Combine all classes
    const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${responsiveClass} ${widthClass} ${className}`.trim();

    // Render as Link if 'to' prop is provided, otherwise render as button
    if (to) {
        return (
            <Link
                to={to}
                className={combinedClasses}
                onClick={onClick}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;


// // Basic primary button
// <Button>Click Me</Button>

// // Outline button with link
// <Button to="/register" outline>Register</Button>

// // Large secondary button
// <Button variant="secondary" size="lg">Big Button</Button>

// // Full width button hidden on mobile
// <Button fullWidth hiddenOnMobile>Wide Button</Button>

// // Submit button for forms
// <Button type="submit">Submit Form</Button>

// // Disabled button
// <Button disabled>Can't Click</Button>