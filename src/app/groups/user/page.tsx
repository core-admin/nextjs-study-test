import { headers } from 'next/headers';
import MobileUser from '../(mobile)/user/page';
import WebUser from '../(web)/user/page';

export default function UserPage() {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);

  return isMobile ? <MobileUser /> : <WebUser />;
}
