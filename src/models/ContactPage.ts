import mongoose, { Schema, Document } from 'mongoose';

// ============================================================
// CONTACT METHOD SUB-DOCUMENT
// ============================================================
export interface IContactMethod {
    icon: string;
    label: string;
    description: string;
    link: string;
    type: 'whatsapp' | 'email' | 'phone' | 'custom';
    isActive: boolean;
    order: number;
}

// ============================================================
// MAIN CONTACT PAGE INTERFACE
// ============================================================
export interface IContactPage extends Document {
    hero: {
        tag: string;
        title: string;
        description: string;
    };
    section: {
        tag: string;
        title: string;
        description: string;
    };
    contactMethods: IContactMethod[];  // Array, not object
    form: {
        title: string;
        description: string;
        submitButton: string;
        successMessage: string;
        consentText: string;
        privacyPolicyLink: string;
        footerNote: string;
    };
    formFields: {
        name: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        company: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        email: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        phone: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        country: {
            label: string;
            placeholder: string;
            required: boolean;
            options: string[];
        };
        service: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        message: {
            label: string;
            placeholder: string;
            required: boolean;
        };
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================
// CONTACT METHOD SCHEMA
// ============================================================
const ContactMethodSchema = new Schema<IContactMethod>({
    icon: {
        type: String,
        required: true,
        default: '💬',
    },
    label: {
        type: String,
        required: true,
        default: 'Chat on WhatsApp',
    },
    description: {
        type: String,
        required: true,
        default: 'Fastest response — our team is available during business hours',
    },
    link: {
        type: String,
        required: true,
        default: 'https://wa.me/8801XXXXXXXXX',
    },
    type: {
        type: String,
        enum: ['whatsapp', 'email', 'phone', 'custom'],
        default: 'whatsapp',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
});

// ============================================================
// MAIN CONTACT PAGE SCHEMA
// ============================================================
const ContactPageSchema = new Schema<IContactPage>(
    {
        hero: {
            tag: {
                type: String,
                required: true,
                default: 'Contact Us',
            },
            title: {
                type: String,
                required: true,
                default: "Let's Talk About Your<br />AI Requirement",
            },
            description: {
                type: String,
                required: true,
                default: 'Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.',
            },
        },
        section: {
            tag: {
                type: String,
                required: true,
                default: 'Consult Us',
            },
            title: {
                type: String,
                required: true,
                default: 'Talk to an<br />AI Specialist',
            },
            description: {
                type: String,
                required: true,
                default: 'Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.',
            },
        },
        contactMethods: {
            type: [ContactMethodSchema],
            required: true,
            default: [
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
        },
        form: {
            title: {
                type: String,
                required: true,
                default: 'Send Your AI Requirement',
            },
            description: {
                type: String,
                required: true,
                default: 'Fill in the form and our AI Solutions team will contact you within one business day.',
            },
            submitButton: {
                type: String,
                required: true,
                default: 'Send My Requirement →',
            },
            successMessage: {
                type: String,
                required: true,
                default: '✓ Requirement Sent! Our team will contact you soon.',
            },
            consentText: {
                type: String,
                required: true,
                default: 'I consent to NGEN IT contacting me to discuss my AI requirement.',
            },
            privacyPolicyLink: {
                type: String,
                required: true,
                default: '/privacy',
            },
            footerNote: {
                type: String,
                required: true,
                default: '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.',
            },
        },
        formFields: {
            name: {
                label: {
                    type: String,
                    required: true,
                    default: 'Full Name',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'Your full name',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
            company: {
                label: {
                    type: String,
                    required: true,
                    default: 'Company Name',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'Your organization',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
            email: {
                label: {
                    type: String,
                    required: true,
                    default: 'Business Email',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'you@company.com',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
            phone: {
                label: {
                    type: String,
                    required: true,
                    default: 'WhatsApp / Mobile',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: '+880 / +44 / +65...',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
            country: {
                label: {
                    type: String,
                    required: true,
                    default: 'Country',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'Select country',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
                options: {
                    type: [String],
                    default: [
                        'Bangladesh',
                        'United Kingdom',
                        'Singapore',
                        'Portugal',
                        'UAE / Middle East',
                        'Other',
                    ],
                },
            },
            service: {
                label: {
                    type: String,
                    required: true,
                    default: 'Interested Service',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'Select a service',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
            message: {
                label: {
                    type: String,
                    required: true,
                    default: 'Your Requirement',
                },
                placeholder: {
                    type: String,
                    required: true,
                    default: 'Briefly describe your business challenge, AI idea or project requirement...',
                },
                required: {
                    type: Boolean,
                    default: true,
                },
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ContactPage = mongoose.models.ContactPage || mongoose.model<IContactPage>('ContactPage', ContactPageSchema);