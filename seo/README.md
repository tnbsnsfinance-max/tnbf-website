# TNBF SEO Documentation

## Overview

This directory contains all SEO-related files and documentation for the TNBF
website.

## Files

### 1. Meta Tags (`meta-tags.md`)

Complete documentation of meta titles, descriptions, and keywords for all pages.
These should be implemented in the `<head>` section of each HTML page.

### 2. Sitemap (`../sitemap.xml`)

XML sitemap listing all pages with priorities and update frequencies. Submit
this to Google Search Console and Bing Webmaster Tools.

### 3. Robots.txt (`../robots.txt`)

Search engine crawler directives. Place this file in the root directory of your
website.

### 4. Schema Markup

#### Local Business Schema (`schema/local-business-schema.json`)

Structured data for TNBF as a local business. Implement this on the homepage and
about page by adding to the `<head>` section:

```html
<script type="application/ld+json">
  <!-- Insert local-business-schema.json content here -->
</script>
```

#### Financial Service Schema (`schema/financial-service-schema.json`)

Structured data for TNBF loan products. Implement this on the loans page by
adding to the `<head>` section:

```html
<script type="application/ld+json">
  <!-- Insert financial-service-schema.json content here -->
</script>
```

## Implementation Checklist

- [ ] Add meta tags to all HTML pages
- [ ] Upload sitemap.xml to root directory
- [ ] Upload robots.txt to root directory
- [ ] Add Local Business schema to home and about pages
- [ ] Add Financial Service schema to loans page
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test schema markup using Google's Rich Results Test
- [ ] Verify robots.txt using Google Search Console

## SEO Best Practices Implemented

✅ Unique H1 on every page\
✅ Proper heading hierarchy (H1 → H2 → H3)\
✅ Descriptive meta titles (50-60 characters)\
✅ Compelling meta descriptions (150-160 characters)\
✅ Keyword optimization without stuffing\
✅ Internal linking between pages\
✅ Schema.org structured data\
✅ Mobile-responsive design\
✅ Fast page load times (static HTML)\
✅ Clean URL structure

## Next Steps

1. **Local SEO**: Create Google Business Profile for TNBF
2. **Content**: Regularly update blog with fresh content
3. **Backlinks**: Build quality backlinks from business directories
4. **Analytics**: Set up Google Analytics 4 and Search Console
5. **Monitoring**: Track keyword rankings and organic traffic

## Contact

For SEO questions: tnbsns.finance@gmail.com
