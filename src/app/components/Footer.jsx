"use client";
import React from "react";
import {Container, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import Link from "next/link";
import {useSelector} from "react-redux";
import "./Footer.css";

export default function Footer() {
    const {language} = useSelector((state) => state.languages);

    // Translated text
    const footerText = {
        about: language === "ar" ? "حول التطبيق" : "About MovieApp",
        aboutDesc: language === "ar"
            ? "منصتك المفضلة لاستكشاف الأفلام والمسلسلات مع ميزات متقدمة وتجربة مستخدم استثنائية."
            : "Your favorite platform for discovering movies and TV shows with advanced features and exceptional user experience.",

        quickLinks: language === "ar" ? "روابط سريعة" : "Quick Links",
        movies: language === "ar" ? "الأفلام" : "Movies",
        tvShows: language === "ar" ? "المسلسلات" : "TV Shows",
        wishlist: language === "ar" ? "قائمة المفضلة" : "Wishlist",
        search: language === "ar" ? "البحث" : "Search",

        support: language === "ar" ? "الدعم" : "Support",
        help: language === "ar" ? "المساعدة" : "Help Center",
        contact: language === "ar" ? "اتصل بنا" : "Contact Us",
        faq: language === "ar" ? "الأسئلة الشائعة" : "FAQ",
        feedback: language === "ar" ? "التقييمات" : "Feedback",

        legal: language === "ar" ? "قانوني" : "Legal",
        privacy: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
        terms: language === "ar" ? "شروط الاستخدام" : "Terms of Service",
        cookies: language === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy",

        newsletter: language === "ar" ? "النشرة الإخبارية" : "Newsletter",
        newsletterDesc: language === "ar"
            ? "اشترك للحصول على آخر الأخبار والإصدارات الجديدة"
            : "Subscribe to get the latest news and new releases",
        emailPlaceholder: language === "ar" ? "بريدك الإلكتروني" : "Your email address",
        subscribe: language === "ar" ? "اشتراك" : "Subscribe",

        followUs: language === "ar" ? "تابعنا" : "Follow Us",
        copyright: language === "ar"
            ? "جميع الحقوق محفوظة © 2024 تطبيق الأفلام"
            : "© 2024 MovieApp. All rights reserved.",

        madeWith: language === "ar" ? "صنع بـ" : "Made with",
        love: language === "ar" ? "حب" : "love",
        by: language === "ar" ? "بواسطة" : "by",
        team: language === "ar" ? "فريق التطوير" : "Development Team"
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <Container>
                {/* Main Footer Content */}
                <Row className="footer-main py-5">
                    {/* About Section */}
                    <Col lg={3} md={6} className="mb-4">
                        <div className="footer-section">
                            <div className="footer-logo mb-3">
                                <h4 className="footer-brand">
                                    <i className="fa-solid fa-film me-2"></i>
                                    MovieApp
                                </h4>
                            </div>
                            <p className="footer-about">
                                {footerText.aboutDesc}
                            </p>
                            <div className="app-rating">
                                <div className="rating-stars">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <span className="rating-text">4.8/5 - 12,450 reviews</span>
                            </div>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} className="mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">{footerText.quickLinks}</h5>
                            <ul className="footer-links">
                                <li><Link href="/">{language === "ar" ? "الرئيسية" : "Home"}</Link></li>
                                <li><Link href="/MoviesList">{footerText.movies}</Link></li>
                                <li><Link href="/tv">{footerText.tvShows}</Link></li>
                                <li><Link href="/movies/wishlist">{footerText.wishlist}</Link></li>
                                <li><Link href="/search">{footerText.search}</Link></li>
                            </ul>
                        </div>
                    </Col>

                    {/* Support */}
                    <Col lg={2} md={6} className="mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">{footerText.support}</h5>
                            <ul className="footer-links">
                                <li><Link href="/help">{footerText.help}</Link></li>
                                <li><Link href="/contact">{footerText.contact}</Link></li>
                                <li><Link href="/faq">{footerText.faq}</Link></li>
                                <li><Link href="/feedback">{footerText.feedback}</Link></li>
                                <li><Link
                                    href="/support">{language === "ar" ? "الدعم الفني" : "Technical Support"}</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    {/* Legal */}
                    <Col lg={2} md={6} className="mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">{footerText.legal}</h5>
                            <ul className="footer-links">
                                <li><Link href="/privacy">{footerText.privacy}</Link></li>
                                <li><Link href="/terms">{footerText.terms}</Link></li>
                                <li><Link href="/cookies">{footerText.cookies}</Link></li>
                                <li><Link href="/dmca">{language === "ar" ? "حقوق الطبع والنشر" : "DMCA"}</Link></li>
                                <li><Link
                                    href="/accessibility">{language === "ar" ? "إمكانية الوصول" : "Accessibility"}</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={3} md={6} className="mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">{footerText.newsletter}</h5>
                            <p className="newsletter-desc">{footerText.newsletterDesc}</p>
                            <Form className="newsletter-form">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder={footerText.emailPlaceholder}
                                        className="newsletter-input"
                                        aria-label="Email address"
                                    />
                                    <Button variant="warning" className="newsletter-btn">
                                        {footerText.subscribe}
                                    </Button>
                                </InputGroup>
                            </Form>

                            {/* Social Media */}
                            <div className="social-section mt-4">
                                <h6 className="social-title">{footerText.followUs}</h6>
                                <div className="social-links">
                                    <a href="#" className="social-link facebook" aria-label="Facebook">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="social-link twitter" aria-label="Twitter">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="#" className="social-link instagram" aria-label="Instagram">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" className="social-link youtube" aria-label="YouTube">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                    <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" className="social-link discord" aria-label="Discord">
                                        <i className="fa-brands fa-discord"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <Row className="footer-bottom py-4 border-top">
                    <Col md={6} className="mb-3 mb-md-0">
                        <p className="copyright-text mb-0">
                            © {currentYear} MovieApp. {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
                        </p>
                        <p className="made-with mb-0">
                            {footerText.madeWith} <i
                            className="fa-solid fa-heart text-danger"></i> {footerText.by} {footerText.team}
                        </p>
                    </Col>

                    <Col md={6} className="text-md-end">
                        <div className="footer-badges">
                            <div className="app-store-badges">
                                <a href="#" className="badge-link">
                                    <img src="/api/placeholder/120/40" alt="Download on App Store"
                                         className="store-badge"/>
                                </a>
                                <a href="#" className="badge-link">
                                    <img src="/api/placeholder/120/40" alt="Get it on Google Play"
                                         className="store-badge"/>
                                </a>
                            </div>
                            <div className="payment-methods">
                                <span
                                    className="payment-text">{language === "ar" ? "طرق الدفع المقبولة:" : "Accepted payments:"}</span>
                                <div className="payment-icons">
                                    <i className="fa-brands fa-cc-visa"></i>
                                    <i className="fa-brands fa-cc-mastercard"></i>
                                    <i className="fa-brands fa-cc-paypal"></i>
                                    <i className="fa-brands fa-cc-apple-pay"></i>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Back to Top Button */}
                <div className="back-to-top">
                    <button
                        className="back-to-top-btn"
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        aria-label="Back to top"
                    >
                        <i className="fa-solid fa-chevron-up"></i>
                    </button>
                </div>
            </Container>
        </footer>
    );
}