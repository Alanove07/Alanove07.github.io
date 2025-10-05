# Portfolio Assets

This folder contains all the media assets for the portfolio website.

## Image Requirements

### Profile Image (`profile.jpg`)
- **Size**: 350x350 pixels (square)
- **Format**: JPG or PNG
- **Description**: Your professional headshot or avatar

### About Image (`about-image.jpg`)
- **Size**: 400x300 pixels (4:3 ratio)
- **Format**: JPG or PNG
- **Description**: An image that represents you or your workspace

### Project Images
- **Size**: 400x250 pixels (16:10 ratio)
- **Format**: JPG or PNG
- **Naming**: `project1.jpg`, `project2.jpg`, `project3.jpg`
- **Description**: Screenshots or mockups of your projects

## Adding Your Images

1. Replace the placeholder files with your actual images
2. Ensure images are optimized for web (compressed but good quality)
3. Use descriptive alt text in the HTML for accessibility
4. Consider using WebP format for better performance

## Image Optimization Tips

- Use tools like TinyPNG or ImageOptim to compress images
- Maintain aspect ratios to prevent distortion
- Use appropriate file formats (JPG for photos, PNG for graphics with transparency)
- Consider creating multiple sizes for different screen resolutions

## Fallback Handling

The JavaScript in `script.js` includes automatic fallback generation for missing images:
- Creates gradient backgrounds with initials or project names
- Ensures the layout remains intact even without images
- Provides a professional appearance during development

## Stock Photo Resources

If you need placeholder images during development:
- [Unsplash](https://unsplash.com) - Free high-quality photos
- [Pixabay](https://pixabay.com) - Free images and illustrations
- [Pexels](https://pexels.com) - Free stock photos