import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function getModelName(module: string) {
  switch (module) {
    case 'hospitals': return 'hospital';
    case 'doctors': return 'doctor';
    case 'specialties': return 'specialty';
    case 'blog': return 'blogPost';
    case 'testimonials': return 'testimonial';
    case 'faqs': return 'fAQ';
    case 'team': return 'teamMember';
    case 'settings': return 'siteSetting';
    default: return null;
  }
}

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// POST: Add new record
export async function POST(req: Request, { params }: { params: { module: string } }) {
  try {
    const modelName = getModelName(params.module);
    if (!modelName) {
      return NextResponse.json({ error: 'Invalid CMS module' }, { status: 400 });
    }

    const body = await req.json();
    const model = (db as any)[modelName];

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 400 });
    }

    // Auto generate slug if needed
    if (!body.slug && body.name) {
      body.slug = generateSlug(body.name);
    } else if (!body.slug && body.title) {
      body.slug = generateSlug(body.title);
    }

    // Sanitize fields for specific models
    if (params.module === 'blog') {
      body.published = body.published !== false;
    }
    if (params.module === 'testimonials') {
      body.rating = Number(body.rating) || 5;
    }

    const newItem = await model.create({
      data: body
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    console.error('CMS POST Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create record' }, { status: 500 });
  }
}

// PUT: Edit existing record
export async function PUT(req: Request, { params }: { params: { module: string } }) {
  try {
    const modelName = getModelName(params.module);
    if (!modelName) {
      return NextResponse.json({ error: 'Invalid CMS module' }, { status: 400 });
    }

    const body = await req.json();
    const { id, key, ...data } = body;
    const model = (db as any)[modelName];

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 400 });
    }

    let updatedItem: any;

    if (params.module === 'settings') {
      updatedItem = await model.update({
        where: { key: key || id },
        data: { value: data.value }
      });
    } else {
      if (!id) {
        return NextResponse.json({ error: 'Record ID is required for edit' }, { status: 400 });
      }

      if (!data.slug && data.name) {
        data.slug = generateSlug(data.name);
      } else if (!data.slug && data.title) {
        data.slug = generateSlug(data.title);
      }

      if (params.module === 'testimonials' && data.rating) {
        data.rating = Number(data.rating);
      }

      updatedItem = await model.update({
        where: { id },
        data
      });
    }

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error: any) {
    console.error('CMS PUT Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update record' }, { status: 500 });
  }
}

// DELETE: Delete record
export async function DELETE(req: Request, { params }: { params: { module: string } }) {
  try {
    const modelName = getModelName(params.module);
    if (!modelName) {
      return NextResponse.json({ error: 'Invalid CMS module' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const key = searchParams.get('key');

    const model = (db as any)[modelName];
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 400 });
    }

    if (params.module === 'settings' && key) {
      await model.delete({ where: { key } });
    } else if (id) {
      await model.delete({ where: { id } });
    } else {
      return NextResponse.json({ error: 'ID or key required' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('CMS DELETE Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete record' }, { status: 500 });
  }
}
