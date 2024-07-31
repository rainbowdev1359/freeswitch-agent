import React, { useState, useEffect } from 'react';

function ImageRender({ fileName, color }: { fileName: string; color?: string }) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(fileName);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    if (!svgContent) {
      fetchSvg();
    }
  }, [fileName]);

  useEffect(() => {
    if (svgContent && color) {
      const modifiedSvg = replaceColor(svgContent, color);
      setSvgContent(modifiedSvg);
    }
  }, [color,svgContent]);

  const replaceColor = (svgText: string, newColor: string) => {
    const regex = /#[0-9A-Fa-f]{6}\b/g;
    const modifiedSvg = svgText.replace(regex, newColor);
    return modifiedSvg;
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </>
  );
}

export default ImageRender;
