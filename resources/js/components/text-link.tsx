import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<typeof Link>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <Link
            className={cn(
                'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-300 ease-out hover:text-primary/80',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
