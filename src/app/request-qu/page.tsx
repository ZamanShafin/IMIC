import { redirect } from 'next/navigation';

export default function RequestQuoteRedirect() {
  redirect('/book-appointment');
}
