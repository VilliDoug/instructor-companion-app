import { ReactNode } from "react";
import '../styles/Layout.scss';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout ({ children }: LayoutProps) {
    return (
        <div className="app-layout">
            {/* Header */}
            <header className="app-header">
                <div className="header-left">
                    <h1>CARPE DIEM BJJ</h1>
                </div>
            </header>

            {/* Main container w/ sidenav + content */}
            <div className="app-main">
                {/* Sidenav */}
                <nav className="app-sidenav">
                    <ul>
                        <li><a href="/">ホーム</a></li>
                        <li><a href="/members">会員一覧</a></li>
                        <li><a href="/attendance">参加管理</a></li>
                    </ul>
                </nav>

                {/* content area */}
                <main className="app-content">
                    {children}
                </main>
            </div>

            {/* footer */}
            <footer className="app-footer">
                <p>&copy; 2026 Carpe Diem BJJ Isahaya</p>
                <div className="footer-links">
                    <a href="#">Instagram</a>
                    <a href="#">LINE</a>
                    <a href="#">Facebook</a>
                </div>
            </footer>
        </div>
    )
}