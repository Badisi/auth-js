import React, { useEffect, type ReactNode } from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): ReactNode {
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav.navbar');
            if (nav) {
                if (window.scrollY > 0) {
                    nav.classList.add('navbar--scrolled');
                } else {
                    nav.classList.remove('navbar--scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <Navbar {...props} />;
}
