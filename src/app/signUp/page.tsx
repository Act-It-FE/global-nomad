import Link from 'next/link';

import { getRedirectUrl } from '@/utils/oauth/getRedirectUrl';

export default function SignUp() {
  const redirectUrl = getRedirectUrl();
  return (
    <Link href={redirectUrl}>
      <button>카카오로 시작하기</button>
    </Link>
  );
}
