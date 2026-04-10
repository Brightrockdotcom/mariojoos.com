# Deployment Guide — mariojoos.com

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project (or create a new one — free tier works fine)
3. Go to **Project Settings** → **API**
4. Copy your **Project URL** and **anon/public** key
5. Go to **SQL Editor** → click **New Query**
6. Paste the entire contents of `supabase-schema.sql` and click **Run**
7. This creates all tables, RLS policies, and seed data

### Update your env file

Open `.env.local` and replace the placeholder values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI... (your anon key)
```

## 2. GitHub Setup

```bash
cd D:\MARIOJOOS.COM
git init
git add .
git commit -m "Initial build: mariojoos.com"
git remote add origin https://github.com/YOUR_USERNAME/mariojoos.com.git
git push -u origin main
```

## 3. Vercel Deployment

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your `mariojoos.com` repository
4. Framework: **Next.js** (auto-detected)
5. Add **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**
7. Once deployed, Vercel gives you a `.vercel.app` URL

## 4. GoDaddy DNS → Vercel

1. In Vercel, go to your project → **Settings** → **Domains**
2. Add `mariojoos.com` and `www.mariojoos.com`
3. Vercel will show you DNS records to configure
4. In GoDaddy:
   - Go to **My Products** → **DNS** for mariojoos.com
   - Update/add an **A Record**:
     - Type: A
     - Name: @
     - Value: `76.76.21.21` (Vercel's IP)
     - TTL: 600
   - Add a **CNAME Record**:
     - Type: CNAME
     - Name: www
     - Value: `cname.vercel-dns.com`
     - TTL: 600
5. Wait 5-30 minutes for DNS propagation
6. Back in Vercel, verify the domain — it should auto-issue an SSL certificate

## 5. Adding Your Photo

Replace the placeholder in the About section:

1. Add your photo to `public/images/mario.jpg`
2. Edit `src/components/About.tsx`:
   - Replace the placeholder div with an `<Image>` component
   - Import: `import Image from "next/image"`
   - Use: `<Image src="/images/mario.jpg" alt="Mario Joos" fill className="object-cover" />`

## 6. Adding Client Logos

1. Add logo images to `public/images/clients/`
2. Update the Clients component or manage them via Supabase `clients` table

## 7. Managing Content via Supabase

All dynamic content can be managed in Supabase:
- **Testimonials**: Add/edit in the `testimonials` table
- **Clients**: Add/edit in the `clients` table
- **Stats**: Update numbers in the `stats` table
- **Case Studies**: Add/edit in the `case_studies` table
- **Contact Submissions**: View in the `contacts` table
- **Analytics**: View page views in the `page_views` table

To use Supabase data dynamically (instead of hardcoded), update each component
to fetch from Supabase on the server side using `supabase.from('table').select()`.
