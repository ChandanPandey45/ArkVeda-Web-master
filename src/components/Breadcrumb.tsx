import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  switch (pathname) {
    case '/services':
      breadcrumbs.push({ label: 'Services', path: '/services' });
      break;
    case '/case-studies':
      breadcrumbs.push({ label: 'Case Studies', path: '/case-studies' });
      break;
    case '/technology':
      breadcrumbs.push({ label: 'Technology', path: '/technology' });
      break;
    case '/quote':
      breadcrumbs.push({ label: 'Get a Quote', path: '/quote' });
      break;
    case '/faq':
      breadcrumbs.push({ label: 'FAQ', path: '/faq' });
      break;
  }

  return breadcrumbs;
};

export default function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Only show breadcrumbs on subpages (not homepage)
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-200 py-3 lg:py-4 sticky top-20 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-solar-navy font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-solar-gray hover:text-solar-yellow transition-colors"
                  title={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Breadcrumb Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.label,
            'item': `https://arkvedaenergy.in${item.path}`
          }))
        })}
      </script>
    </nav>
  );
}
