# STANDARDIZED LAYOUT FIX

## The Problem
Too many responsive variations (`pt-4 sm:pt-8 md:pt-12 lg:pt-16`) causing:
- Inconsistent title positioning
- Content jumping around
- Different spacing on each slide
- Messy appearance at all screen sizes

## The Solution
**ONE CONSISTENT PADDING SYSTEM FOR ALL SLIDES**

### Standard Slide Wrapper
```jsx
// ALL slides use this:
<div className="slide-wrapper">
  <div className="slide-content-area">
    {/* Content here */}
  </div>
</div>
```

### CSS
```css
.slide-wrapper {
  padding: 100px 60px 60px 60px; /* Consistent on all slides */
}

@media (max-width: 768px) {
  .slide-wrapper {
    padding: 60px 24px 24px 24px;
  }
}
```

### Rules
1. **NO** variable padding (no `pt-4 sm:pt-8 md:pt-12`)
2. **ALL** slides start content at same vertical position
3. **SIMPLE** responsive: desktop vs mobile only
4. **CONSISTENT** title sizes across slides
