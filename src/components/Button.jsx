import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({
    to,
    type = 'button',
    onClick,
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    outline = false,
    fullWidth = false,
    disabled = false,
    hiddenOnMobile = false,
    ...restProps // Capture all other props
}) => {
    // Base button classes
    const baseClasses = 'btn inline-flex items-center justify-center transition-colors';

    // Variant classes - modified to prevent class name conflicts
    const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;

    // Size classes
    const sizeClasses = {
        sm: 'text-xs py-1 px-2',
        md: 'text-sm py-2 px-4',
        lg: 'text-base py-3 px-6'
    };

    // Responsive classes
    const responsiveClass = hiddenOnMobile ? 'hidden sm:inline-flex' : '';

    // Full width class
    const widthClass = fullWidth ? 'w-full' : '';

    // Combine all classes
    const combinedClasses = `${baseClasses} ${variantClass} ${sizeClasses[size]} ${responsiveClass} ${widthClass} ${className}`.trim();

    // If disabled, prevent onClick and modify styles
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick && onClick(e);
    };

    // Render as Link if 'to' prop is provided and not disabled
    if (to && !disabled) {
        return (
            <Link
                to={to}
                className={combinedClasses}
                onClick={handleClick}
                {...restProps} // Spread additional props
                aria-disabled={disabled ? "true" : undefined}
            >
                {children}
            </Link>
        );
    }

    // Default button render
    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={handleClick}
            disabled={disabled}
            {...restProps} // Spread additional props
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    outline: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    hiddenOnMobile: PropTypes.bool,
};

export default Button;