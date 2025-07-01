import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Have questions or want to discuss a project? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="card bg-base-200 shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <FaEnvelope className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Email Us</h3>
                                        <p className="text-base-content/70">support@jpanipaicha.com</p>
                                        <p className="text-base-content/70">info@jpanipaicha.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                                        <FaPhoneAlt className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Call Us</h3>
                                        <p className="text-base-content/70">+1 (555) 123-4567</p>
                                        <p className="text-base-content/70">Mon-Fri: 9am-5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-accent/10 text-accent">
                                        <FaMapMarkerAlt className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Visit Us</h3>
                                        <p className="text-base-content/70">123 Tech Street</p>
                                        <p className="text-base-content/70">San Francisco, CA 94107</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                            <p className="text-base-content/70 mb-6">Stay connected with us on social media</p>

                            <div className="flex gap-4">
                                <button className="btn btn-circle btn-outline">
                                    <FaXTwitter className="h-5 w-5" />
                                </button>
                                <button className="btn btn-circle btn-outline">
                                    <FaInstagram className="h-5 w-5" />
                                </button>
                                <button className="btn btn-circle btn-outline">
                                    <FaLinkedin className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-200 shadow-xl p-8">
                        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

                        {submitSuccess ? (
                            <div className="alert alert-success shadow-lg mb-6">
                                <div>
                                    <FaCheckCircle className="stroke-current flex-shrink-0 h-6 w-6" />
                                    <span>Your message has been sent successfully! We'll get back to you soon.</span>
                                </div>
                            </div>
                        ) : null}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="form-control">
                                    <label className="label" htmlFor="name">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label" htmlFor="email">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label" htmlFor="subject">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div className="form-control flex flex-col">
                                <label className="label" htmlFor="message">
                                    <span className="label-text">Your Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered h-48 w-full"
                                    placeholder="Tell us about your project or inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control mt-8">
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {!isSubmitting && (
                                        <>
                                            <FaPaperPlane className="h-5 w-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;