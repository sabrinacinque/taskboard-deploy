import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');

    try {
      console.log('Sending contact request to backend:', formData);
      
      const response = await fetch('http://localhost:8080/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid background text-white vh-100 p-3 p-md-4 overflow-y-scroll">
      <div className="pt-3 pt-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="text-white display-4 mb-3">Contact Us</h1>
              <p className="text-light fs-5">Get in touch with our support team</p>
            </div>

            {showSuccess && (
              <div className="alert alert-success mb-4" role="alert">
                <h5 className="alert-heading">Message Sent!</h5>
                <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger mb-4" role="alert">
                <h5 className="alert-heading">Error</h5>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="row g-4">
              <div className="col-md-8 mx-auto">
                <div className="card bg-dark bg-opacity-75 text-white">
                  <div className="card-body p-4">
                    <h5 className="card-title text-warning mb-4">Send us a message</h5>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label">Name *</label>
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label">Email *</label>
                          <input
                            type="email"
                            className="form-control bg-dark text-white border-secondary"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject *</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="message" className="form-label">Message *</label>
                        <textarea
                          className="form-control bg-dark text-white border-secondary"
                          id="message"
                          name="message"
                          rows="6"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        ></textarea>
                      </div>

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mx-auto mt-4">
                <div className="card bg-dark bg-opacity-75 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">Contact Information</h5>
                    <div className="mt-3">
                      <p className="mb-2">
                        <strong>Email:</strong><br />
                        <span className="text-info">cinque.sabrina@gmail.com</span>
                      </p>
                      <p className="mb-2">
                        <strong>Response Time:</strong><br />
                        We typically respond within 24 hours
                      </p>
                      <p className="mb-0">
                        <strong>Support Hours:</strong><br />
                        Monday - Friday, 9 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
