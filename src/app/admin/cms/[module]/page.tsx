import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import CMSModuleClient from '@/components/admin/CMSModuleClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { module: string };
}

export default async function CMSModulePage({ params }: PageProps) {
  const { module } = params;

  let items: any[] = [];
  let title = '';
  let hospitals: any[] = [];

  try {
    if (module === 'hospitals') {
      title = 'Hospitals Directory CMS';
      items = await db.hospital.findMany({ orderBy: { name: 'asc' } });
    } else if (module === 'doctors') {
      title = 'Doctors & Specialists CMS';
      items = await db.doctor.findMany({ include: { hospital: true }, orderBy: { name: 'asc' } });
      hospitals = await db.hospital.findMany({ select: { id: true, name: true, country: true } });
    } else if (module === 'specialties') {
      title = 'Medical Specialties Taxonomy CMS';
      items = await db.specialty.findMany({ orderBy: { name: 'asc' } });
    } else if (module === 'blog') {
      title = 'Blog & Articles CMS';
      items = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    } else if (module === 'testimonials') {
      title = 'Patient Testimonials CMS';
      items = await db.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    } else if (module === 'faqs') {
      title = 'FAQs CMS';
      items = await db.fAQ.findMany({ orderBy: { sortOrder: 'asc' } });
    } else if (module === 'team') {
      title = 'Team Members CMS';
      items = await db.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });
    } else if (module === 'settings') {
      title = 'Site Settings & Contact Phone Numbers';
      items = await db.siteSetting.findMany();
    } else {
      notFound();
    }
  } catch (error) {
    console.error('CMS DB Fetch error:', error);
  }

  return (
    <CMSModuleClient
      module={module}
      title={title}
      initialItems={items}
      hospitals={hospitals}
    />
  );
}
