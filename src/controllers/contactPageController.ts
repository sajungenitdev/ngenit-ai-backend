// import { Request, Response } from 'express';
// import { ContactPage } from '../models/ContactPage';
// import nodemailer from 'nodemailer'; // For email notifications
// import { ContactSubmission } from '../models/ContactSubmission';

// // ============================================================
// // GET - Fetch Contact Page
// // ============================================================
// export const getContactPage = async (req: Request, res: Response) => {
//     try {
//         let contactPage = await ContactPage.findOne();

//         if (!contactPage) {
//             // Create default if none exists
//             contactPage = await ContactPage.create({
//                 hero: {
//                     tag: 'Contact Us',
//                     title: "Let's Talk About Your<br />AI Requirement",
//                     description: 'Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.',
//                 },
//                 section: {
//                     tag: 'Consult Us',
//                     title: 'Talk to an<br />AI Specialist',
//                     description: 'Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.',
//                 },
//                 contactMethods: [
//                     {
//                         icon: '💬',
//                         label: 'Chat on WhatsApp',
//                         description: 'Fastest response — our team is available during business hours',
//                         link: 'https://wa.me/8801XXXXXXXXX',
//                         type: 'whatsapp',
//                         isActive: true,
//                         order: 0,
//                     },
//                     {
//                         icon: '📧',
//                         label: 'Email Our AI Team',
//                         description: 'ai@ngenitltd.com — detailed enquiries welcome',
//                         link: 'mailto:ai@ngenitltd.com',
//                         type: 'email',
//                         isActive: true,
//                         order: 1,
//                     },
//                     {
//                         icon: '📞',
//                         label: 'Call Us',
//                         description: 'Bangladesh, UK, Singapore, Portugal, Middle East offices',
//                         link: '#',
//                         type: 'phone',
//                         isActive: true,
//                         order: 2,
//                     },
//                 ],
//                 form: {
//                     title: 'Send Your AI Requirement',
//                     description: 'Fill in the form and our AI Solutions team will contact you within one business day.',
//                     submitButton: 'Send My Requirement →',
//                     successMessage: '✓ Requirement Sent! Our team will contact you soon.',
//                     consentText: 'I consent to NGEN IT contacting me to discuss my AI requirement.',
//                     privacyPolicyLink: '/privacy',
//                     footerNote: '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.',
//                 },
//                 formFields: {
//                     name: {
//                         label: 'Full Name',
//                         placeholder: 'Your full name',
//                         required: true,
//                     },
//                     company: {
//                         label: 'Company Name',
//                         placeholder: 'Your organization',
//                         required: true,
//                     },
//                     email: {
//                         label: 'Business Email',
//                         placeholder: 'you@company.com',
//                         required: true,
//                     },
//                     phone: {
//                         label: 'WhatsApp / Mobile',
//                         placeholder: '+880 / +44 / +65...',
//                         required: true,
//                     },
//                     country: {
//                         label: 'Country',
//                         placeholder: 'Select country',
//                         required: true,
//                         options: [
//                             'Bangladesh',
//                             'United Kingdom',
//                             'Singapore',
//                             'Portugal',
//                             'UAE / Middle East',
//                             'Other',
//                         ],
//                     },
//                     service: {
//                         label: 'Interested Service',
//                         placeholder: 'Select a service',
//                         required: true,
//                     },
//                     message: {
//                         label: 'Your Requirement',
//                         placeholder: 'Briefly describe your business challenge, AI idea or project requirement...',
//                         required: true,
//                     },
//                 },
//                 isActive: true,
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: contactPage,
//         });
//     } catch (error: any) {
//         console.error('Get Contact Page Error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to fetch contact page',
//         });
//     }
// };

// // ============================================================
// // PUT - Update Contact Page
// // ============================================================
// export const updateContactPage = async (req: Request, res: Response) => {
//     try {
//         const updateData = req.body;

//         let contactPage = await ContactPage.findOne();

//         if (contactPage) {
//             const updated = await ContactPage.findByIdAndUpdate(
//                 contactPage._id,
//                 { ...updateData, updatedAt: new Date() },
//                 { new: true, runValidators: true }
//             );
            
//             res.status(200).json({
//                 success: true,
//                 data: updated,
//                 message: 'Contact page updated successfully',
//             });
//         } else {
//             const created = await ContactPage.create(updateData);
//             res.status(201).json({
//                 success: true,
//                 data: created,
//                 message: 'Contact page created successfully',
//             });
//         }
//     } catch (error: any) {
//         console.error('Update Contact Page Error:', error);

//         if (error.name === 'ValidationError') {
//             const errors = Object.values(error.errors).map((e: any) => e.message);
//             return res.status(400).json({
//                 success: false,
//                 error: 'Validation failed',
//                 details: errors,
//             });
//         }

//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to update contact page',
//         });
//     }
// };

// // ============================================================
// // PUT - Toggle Contact Page Status
// // ============================================================
// export const toggleContactPageStatus = async (req: Request, res: Response) => {
//     try {
//         const { isActive } = req.body;

//         let contactPage = await ContactPage.findOne();

//         if (!contactPage) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Contact page not found',
//             });
//         }

//         const updated = await ContactPage.findByIdAndUpdate(
//             contactPage._id,
//             { isActive, updatedAt: new Date() },
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             data: updated,
//             message: `Contact page ${isActive ? 'activated' : 'deactivated'} successfully`,
//         });
//     } catch (error: any) {
//         console.error('Toggle Contact Page Status Error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to toggle contact page status',
//         });
//     }
// };

// // ============================================================
// // POST - Reset to Default
// // ============================================================
// export const resetContactPage = async (req: Request, res: Response) => {
//     try {
//         const defaultData = {
//             hero: {
//                 tag: 'Contact Us',
//                 title: "Let's Talk About Your<br />AI Requirement",
//                 description: 'Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.',
//             },
//             section: {
//                 tag: 'Consult Us',
//                 title: 'Talk to an<br />AI Specialist',
//                 description: 'Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.',
//             },
//             contactMethods: [
//                 {
//                     icon: '💬',
//                     label: 'Chat on WhatsApp',
//                     description: 'Fastest response — our team is available during business hours',
//                     link: 'https://wa.me/8801XXXXXXXXX',
//                     type: 'whatsapp',
//                     isActive: true,
//                     order: 0,
//                 },
//                 {
//                     icon: '📧',
//                     label: 'Email Our AI Team',
//                     description: 'ai@ngenitltd.com — detailed enquiries welcome',
//                     link: 'mailto:ai@ngenitltd.com',
//                     type: 'email',
//                     isActive: true,
//                     order: 1,
//                 },
//                 {
//                     icon: '📞',
//                     label: 'Call Us',
//                     description: 'Bangladesh, UK, Singapore, Portugal, Middle East offices',
//                     link: '#',
//                     type: 'phone',
//                     isActive: true,
//                     order: 2,
//                 },
//             ],
//             form: {
//                 title: 'Send Your AI Requirement',
//                 description: 'Fill in the form and our AI Solutions team will contact you within one business day.',
//                 submitButton: 'Send My Requirement →',
//                 successMessage: '✓ Requirement Sent! Our team will contact you soon.',
//                 consentText: 'I consent to NGEN IT contacting me to discuss my AI requirement.',
//                 privacyPolicyLink: '/privacy',
//                 footerNote: '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.',
//             },
//             formFields: {
//                 name: {
//                     label: 'Full Name',
//                     placeholder: 'Your full name',
//                     required: true,
//                 },
//                 company: {
//                     label: 'Company Name',
//                     placeholder: 'Your organization',
//                     required: true,
//                 },
//                 email: {
//                     label: 'Business Email',
//                     placeholder: 'you@company.com',
//                     required: true,
//                 },
//                 phone: {
//                     label: 'WhatsApp / Mobile',
//                     placeholder: '+880 / +44 / +65...',
//                     required: true,
//                 },
//                 country: {
//                     label: 'Country',
//                     placeholder: 'Select country',
//                     required: true,
//                     options: [
//                         'Bangladesh',
//                         'United Kingdom',
//                         'Singapore',
//                         'Portugal',
//                         'UAE / Middle East',
//                         'Other',
//                     ],
//                 },
//                 service: {
//                     label: 'Interested Service',
//                     placeholder: 'Select a service',
//                     required: true,
//                 },
//                 message: {
//                     label: 'Your Requirement',
//                     placeholder: 'Briefly describe your business challenge, AI idea or project requirement...',
//                     required: true,
//                 },
//             },
//             isActive: true,
//         };

//         let contactPage = await ContactPage.findOne();

//         if (contactPage) {
//             const updated = await ContactPage.findByIdAndUpdate(
//                 contactPage._id,
//                 { ...defaultData, updatedAt: new Date() },
//                 { new: true }
//             );
//             res.status(200).json({
//                 success: true,
//                 data: updated,
//                 message: 'Contact page reset to default successfully',
//             });
//         } else {
//             const created = await ContactPage.create(defaultData);
//             res.status(201).json({
//                 success: true,
//                 data: created,
//                 message: 'Contact page created with default values',
//             });
//         }
//     } catch (error: any) {
//         console.error('Reset Contact Page Error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to reset contact page',
//         });
//     }
// };

// export const submitContactForm = async (req: Request, res: Response) => {
//     try {
//         const { name, company, email, phone, country, service, message, consent } = req.body;

//         // Validate required fields
//         if (!name || !email || !phone || !message) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Please fill in all required fields',
//             });
//         }

//         if (!consent) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'You must consent to be contacted',
//             });
//         }

//         // Save to database
//         const submission = await ContactSubmission.create({
//             name,
//             company: company || '',
//             email,
//             phone,
//             country: country || '',
//             service: service || '',
//             message,
//             consent,
//             status: 'pending',
//         });

//         console.log('📝 New Contact Submission:', {
//             id: submission._id,
//             name,
//             email,
//             service,
//             submittedAt: new Date().toISOString(),
//         });

//         // Optional: Send email notification
//         // await sendContactEmail(submission);

//         res.status(201).json({
//             success: true,
//             data: submission,
//             message: 'Your requirement has been submitted successfully! Our team will contact you within one business day.',
//         });
//     } catch (error: any) {
//         console.error('Submit Contact Form Error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to submit form',
//         });
//     }
// };

import { Request, Response } from 'express';
import { ContactPage } from '../models/ContactPage';
import { Service } from '../models/Service'; // ✅ Import Service model
import nodemailer from 'nodemailer';
import { ContactSubmission } from '../models/ContactSubmission';

// ============================================================
// GET - Fetch Contact Page with Services
// ============================================================
export const getContactPage = async (req: Request, res: Response) => {
    try {
        let contactPage = await ContactPage.findOne();

        if (!contactPage) {
            // Create default if none exists
            contactPage = await ContactPage.create({
                hero: {
                    tag: 'Contact Us',
                    title: "Let's Talk About Your<br />AI Requirement",
                    description: 'Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.',
                },
                section: {
                    tag: 'Consult Us',
                    title: 'Talk to an<br />AI Specialist',
                    description: 'Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.',
                },
                contactMethods: [
                    {
                        icon: '💬',
                        label: 'Chat on WhatsApp',
                        description: 'Fastest response — our team is available during business hours',
                        link: 'https://wa.me/8801XXXXXXXXX',
                        type: 'whatsapp',
                        isActive: true,
                        order: 0,
                    },
                    {
                        icon: '📧',
                        label: 'Email Our AI Team',
                        description: 'ai@ngenitltd.com — detailed enquiries welcome',
                        link: 'mailto:ai@ngenitltd.com',
                        type: 'email',
                        isActive: true,
                        order: 1,
                    },
                    {
                        icon: '📞',
                        label: 'Call Us',
                        description: 'Bangladesh, UK, Singapore, Portugal, Middle East offices',
                        link: '#',
                        type: 'phone',
                        isActive: true,
                        order: 2,
                    },
                ],
                form: {
                    title: 'Send Your AI Requirement',
                    description: 'Fill in the form and our AI Solutions team will contact you within one business day.',
                    submitButton: 'Send My Requirement →',
                    successMessage: '✓ Requirement Sent! Our team will contact you soon.',
                    consentText: 'I consent to NGEN IT contacting me to discuss my AI requirement.',
                    privacyPolicyLink: '/privacy',
                    footerNote: '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.',
                },
                formFields: {
                    name: {
                        label: 'Full Name',
                        placeholder: 'Your full name',
                        required: true,
                    },
                    company: {
                        label: 'Company Name',
                        placeholder: 'Your organization',
                        required: true,
                    },
                    email: {
                        label: 'Business Email',
                        placeholder: 'you@company.com',
                        required: true,
                    },
                    phone: {
                        label: 'WhatsApp / Mobile',
                        placeholder: '+880 / +44 / +65...',
                        required: true,
                    },
                    country: {
                        label: 'Country',
                        placeholder: 'Select country',
                        required: true,
                        options: [
                            'Bangladesh',
                            'United Kingdom',
                            'Singapore',
                            'Portugal',
                            'UAE / Middle East',
                            'Other',
                        ],
                    },
                    service: {
                        label: 'Interested Service',
                        placeholder: 'Select a service',
                        required: true,
                    },
                    message: {
                        label: 'Your Requirement',
                        placeholder: 'Briefly describe your business challenge, AI idea or project requirement...',
                        required: true,
                    },
                },
                isActive: true,
            });
        }

        // ✅ FIX: Fetch all active services from database
        console.log('🔍 Fetching services for contact page...');
        const services = await Service.find({ isActive: true }).sort({ name: 1 });
        console.log(`✅ Found ${services.length} active services`);

        // ✅ Transform services to the expected format
        const serviceOptions = services.map((service) => ({
            id: service._id.toString(),
            name: service.name,
            displayName: service.tagline || service.name,
        }));

        // ✅ Add "Not sure — need advice" option
        const serviceOptionsWithFallback = [
            ...serviceOptions,
            { id: 'not-sure', name: 'Not sure — need advice', displayName: 'Not sure — need advice' },
        ];

        // ✅ Convert contactPage to object and add serviceOptions
        const responseData = {
            ...contactPage.toObject(),
            serviceOptions: serviceOptionsWithFallback,
        };

        console.log(`✅ Returning ${serviceOptionsWithFallback.length} service options`);

        res.status(200).json({
            success: true,
            data: responseData,
        });
    } catch (error: any) {
        console.error('Get Contact Page Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch contact page',
        });
    }
};

// ============================================================
// PUT - Update Contact Page
// ============================================================
export const updateContactPage = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;

        let contactPage = await ContactPage.findOne();

        if (contactPage) {
            const updated = await ContactPage.findByIdAndUpdate(
                contactPage._id,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Contact page updated successfully',
            });
        } else {
            const created = await ContactPage.create(updateData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Contact page created successfully',
            });
        }
    } catch (error: any) {
        console.error('Update Contact Page Error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e: any) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update contact page',
        });
    }
};

// ============================================================
// PUT - Toggle Contact Page Status
// ============================================================
export const toggleContactPageStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;

        let contactPage = await ContactPage.findOne();

        if (!contactPage) {
            return res.status(404).json({
                success: false,
                error: 'Contact page not found',
            });
        }

        const updated = await ContactPage.findByIdAndUpdate(
            contactPage._id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: `Contact page ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Contact Page Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle contact page status',
        });
    }
};

// ============================================================
// POST - Reset to Default
// ============================================================
export const resetContactPage = async (req: Request, res: Response) => {
    try {
        const defaultData = {
            hero: {
                tag: 'Contact Us',
                title: "Let's Talk About Your<br />AI Requirement",
                description: 'Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.',
            },
            section: {
                tag: 'Consult Us',
                title: 'Talk to an<br />AI Specialist',
                description: 'Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.',
            },
            contactMethods: [
                {
                    icon: '💬',
                    label: 'Chat on WhatsApp',
                    description: 'Fastest response — our team is available during business hours',
                    link: 'https://wa.me/8801XXXXXXXXX',
                    type: 'whatsapp',
                    isActive: true,
                    order: 0,
                },
                {
                    icon: '📧',
                    label: 'Email Our AI Team',
                    description: 'ai@ngenitltd.com — detailed enquiries welcome',
                    link: 'mailto:ai@ngenitltd.com',
                    type: 'email',
                    isActive: true,
                    order: 1,
                },
                {
                    icon: '📞',
                    label: 'Call Us',
                    description: 'Bangladesh, UK, Singapore, Portugal, Middle East offices',
                    link: '#',
                    type: 'phone',
                    isActive: true,
                    order: 2,
                },
            ],
            form: {
                title: 'Send Your AI Requirement',
                description: 'Fill in the form and our AI Solutions team will contact you within one business day.',
                submitButton: 'Send My Requirement →',
                successMessage: '✓ Requirement Sent! Our team will contact you soon.',
                consentText: 'I consent to NGEN IT contacting me to discuss my AI requirement.',
                privacyPolicyLink: '/privacy',
                footerNote: '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.',
            },
            formFields: {
                name: {
                    label: 'Full Name',
                    placeholder: 'Your full name',
                    required: true,
                },
                company: {
                    label: 'Company Name',
                    placeholder: 'Your organization',
                    required: true,
                },
                email: {
                    label: 'Business Email',
                    placeholder: 'you@company.com',
                    required: true,
                },
                phone: {
                    label: 'WhatsApp / Mobile',
                    placeholder: '+880 / +44 / +65...',
                    required: true,
                },
                country: {
                    label: 'Country',
                    placeholder: 'Select country',
                    required: true,
                    options: [
                        'Bangladesh',
                        'United Kingdom',
                        'Singapore',
                        'Portugal',
                        'UAE / Middle East',
                        'Other',
                    ],
                },
                service: {
                    label: 'Interested Service',
                    placeholder: 'Select a service',
                    required: true,
                },
                message: {
                    label: 'Your Requirement',
                    placeholder: 'Briefly describe your business challenge, AI idea or project requirement...',
                    required: true,
                },
            },
            isActive: true,
        };

        let contactPage = await ContactPage.findOne();

        if (contactPage) {
            const updated = await ContactPage.findByIdAndUpdate(
                contactPage._id,
                { ...defaultData, updatedAt: new Date() },
                { new: true }
            );
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Contact page reset to default successfully',
            });
        } else {
            const created = await ContactPage.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Contact page created with default values',
            });
        }
    } catch (error: any) {
        console.error('Reset Contact Page Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset contact page',
        });
    }
};

// ============================================================
// POST - Submit Contact Form
// ============================================================
export const submitContactForm = async (req: Request, res: Response) => {
    try {
        const { name, company, email, phone, country, service, message, consent } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                error: 'Please fill in all required fields',
            });
        }

        if (!consent) {
            return res.status(400).json({
                success: false,
                error: 'You must consent to be contacted',
            });
        }

        // ✅ Create submission with optional fields
        const submission = await ContactSubmission.create({
            name: name.trim(),
            company: company?.trim() || '',
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            country: country?.trim() || '',
            service: service?.trim() || '',
            message: message.trim(),
            consent: consent,
            status: 'pending',
        });

        console.log('📝 New Contact Submission:', {
            id: submission._id,
            name,
            email,
            service: service || 'Not specified',
            submittedAt: new Date().toISOString(),
        });

        res.status(201).json({
            success: true,
            data: submission,
            message: 'Your requirement has been submitted successfully! Our team will contact you within one business day.',
        });
    } catch (error: any) {
        console.error('Submit Contact Form Error:', error);
        
        // ✅ Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e: any) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to submit form',
        });
    }
};