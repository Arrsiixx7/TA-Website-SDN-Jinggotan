import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
        </div>
    );
}
