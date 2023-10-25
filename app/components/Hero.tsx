import clsx from 'clsx';

interface HeroProps {
    title: string;
    subtitle: string;
    variant:
        | 'is-primary'
        | 'is-link'
        | 'is-info'
        | 'is-success'
        | 'is-warning'
        | 'is-danger';
    size:
        | 'is-small'
        | 'is-medium'
        | 'is-large'
        | 'is-halfheight'
        | 'is-fullheight';
}

export default function Hero({ title, subtitle, size, variant }: HeroProps) {
    const heroClassName = clsx('hero', variant, size);

    return (
        <section className={heroClassName}>
            <div className="hero-body">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        </section>
    );
}
