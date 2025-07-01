import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle, FaShoppingCart, FaTruck, FaExchangeAlt, FaShieldAlt, FaCreditCard, FaUser } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const faqCategories = [
        {
            name: 'Product Information',
            icon: <FaShoppingCart className="text-xl" />,
            questions: [
                {
                    question: 'How do I find product specifications?',
                    answer: 'Each product page includes detailed specifications in the "Product Details" section. You can also download technical sheets for many products.'
                },
                {
                    question: 'Are your products authentic and original?',
                    answer: 'Yes, JPaniPaicha only sources products directly from manufacturers or authorized distributors. We guarantee 100% authenticity for all items.'
                },
                {
                    question: 'Do you offer product customization?',
                    answer: 'Many of our products can be customized (colors, engravings, etc.). Look for the "Customization Available" badge on product pages or contact our sales team.'
                }
            ]
        },
        {
            name: 'Ordering Process',
            icon: <FaShoppingCart className="text-xl" />,
            questions: [
                {
                    question: 'How do I place an order?',
                    answer: 'Simply browse our catalog, add items to your cart, and proceed through our secure checkout process. You can checkout as a guest or create an account.'
                },
                {
                    question: 'Can I modify my order after placing it?',
                    answer: 'Orders can be modified within 30 minutes of placement. After that, please contact our customer service immediately as we process orders quickly.'
                },
                {
                    question: 'Is there a minimum order value?',
                    answer: 'No minimum order value for standard purchases. Bulk orders may qualify for additional discounts - contact our sales team for details.'
                }
            ]
        },
        {
            name: 'Shipping & Delivery',
            icon: <FaTruck className="text-xl" />,
            questions: [
                {
                    question: 'What are your shipping options?',
                    answer: 'We offer standard (3-5 business days), express (1-2 business days), and same-day delivery (select locations). Options appear at checkout based on your address.'
                },
                {
                    question: 'Do you ship internationally?',
                    answer: 'Yes, we ship to over 50 countries. International shipping costs and delivery times are calculated at checkout based on your location.'
                },
                {
                    question: 'How can I track my order?',
                    answer: 'You\'ll receive a tracking number via email once your order ships. You can also check order status in your account dashboard.'
                }
            ]
        },
        {
            name: 'Returns & Exchanges',
            icon: <FaExchangeAlt className="text-xl" />,
            questions: [
                {
                    question: 'What is your return policy?',
                    answer: 'We offer a 30-day return policy for most items (exclusions apply). Items must be unused, in original packaging with all tags attached.'
                },
                {
                    question: 'How do I initiate a return?',
                    answer: 'Go to "My Orders" in your account, select the item, and follow the return process. You\'ll receive a prepaid return label for eligible items.'
                },
                {
                    question: 'How long do refunds take to process?',
                    answer: 'Once we receive your return, refunds are processed within 3-5 business days. Credit card refunds may take 1-2 billing cycles to appear.'
                }
            ]
        },
        {
            name: 'Payments & Security',
            icon: <FaShieldAlt className="text-xl" />,
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit/debit cards, PayPal, JPaniPaicha Wallet, bank transfers, and installment payment options.'
                },
                {
                    question: 'Is my payment information secure?',
                    answer: 'Absolutely. We use 256-bit SSL encryption and never store full payment details. All transactions are PCI-DSS compliant.'
                },
                {
                    question: 'Do you offer cash on delivery?',
                    answer: 'Yes, COD is available for most locations with a small additional fee. The exact amount will be shown during checkout.'
                }
            ]
        },
        {
            name: 'Account Management',
            icon: <FaUser className="text-xl" />,
            questions: [
                {
                    question: 'How do I create an account?',
                    answer: 'Click "Sign Up" at the top of any page or during checkout. You can register with your email or through social media accounts.'
                },
                {
                    question: 'How do I reset my password?',
                    answer: 'Click "Forgot Password" on the login page and follow instructions. You\'ll receive an email with a secure link to create a new password.'
                },
                {
                    question: 'Can I have multiple shipping addresses?',
                    answer: 'Yes, you can save multiple addresses in your account and select your preferred one during checkout.'
                }
            ]
        }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Filter questions based on search term
    const filteredCategories = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        <span className='text-2xl lg:text-3xl text-black'>
                            "J
                            <span className="text-[#2c4358]"> PANI </span>
                            <span className="text-[#ea8442]"> PAICHA" </span>
                        </span>

                        Help Center</h1>
                    <p className="text-lg text-base-content/80">
                        Get answers to all your questions about shopping on JPaniPaicha
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10"
                            placeholder="Search help articles (e.g. 'returns', 'track order')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Popular Topics Quick Links */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setSearchTerm('track order')}
                            className="btn btn-outline justify-start"
                        >
                            <FaTruck className="mr-2" /> Track Order
                        </button>
                        <button
                            onClick={() => setSearchTerm('return')}
                            className="btn btn-outline justify-start"
                        >
                            <FaExchangeAlt className="mr-2" /> Returns
                        </button>
                        <button
                            onClick={() => setSearchTerm('payment')}
                            className="btn btn-outline justify-start"
                        >
                            <FaCreditCard className="mr-2" /> Payments
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body text-center py-16">
                            <FaQuestionCircle className="mx-auto text-5xl text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-2">No results found</h3>
                            <p className="text-base-content/70 mb-4">
                                We couldn't find any FAQs matching "{searchTerm}"
                            </p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="btn btn-primary"
                            >
                                View All FAQs
                            </button>
                        </div>
                    </div>
                )}

                {/* FAQ Categories */}
                {filteredCategories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-10">
                        <div className="flex items-center mb-4 gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                {category.icon}
                            </div>
                            <h2 className="text-2xl font-semibold">{category.name}</h2>
                        </div>

                        <div className="space-y-3">
                            {category.questions.map((item, index) => {
                                const questionIndex = `${catIndex}-${index}`;
                                const isActive = activeIndex === questionIndex;

                                return (
                                    <div key={index} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div
                                            className="card-body p-4 cursor-pointer"
                                            onClick={() => toggleQuestion(questionIndex)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-lg">{item.question}</h3>
                                                {isActive ? (
                                                    <FaChevronUp className="text-primary" />
                                                ) : (
                                                    <FaChevronDown className="text-primary" />
                                                )}
                                            </div>

                                            {isActive && (
                                                <div className="mt-4 text-base-content/80">
                                                    <p>{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Contact Support */}
                <div className="card bg-primary text-primary-content mt-12">
                    <div className="card-body text-center">
                        <h2 className="card-title justify-center text-2xl mb-2">Need more help?</h2>
                        <p className="mb-6">Our customer care team is available 24/7</p>
                        <div className="card-actions justify-center gap-4">
                            <button className="btn btn-secondary text-white ">
                                Live Chat
                            </button>
                            <button className="btn btn-outline btn-accent text-white">
                                Call Us: +977 (984) 367-6425
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;