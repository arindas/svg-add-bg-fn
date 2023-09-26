const fetch = require('node-fetch');
const { DOMParser, XMLSerializer } = require('xmldom');

module.exports = async (req, res) => {
    try {
        // Get the input SVG URL from the query parameter
        const inputSvgUrl = req.query.svg;

        // Get the background color from the query parameter (default to white if not provided)
        const backgroundColor = req.query.color || 'white';

        // Fetch the SVG content from the provided URL
        const response = await fetch(inputSvgUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch SVG from ${inputSvgUrl}`);
        }
        const svgContent = await response.text();

        // Parse the SVG content
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');

        // Check if the SVG content is valid
        if (!svgDocument || !svgDocument.documentElement) {
            throw new Error('Invalid SVG format');
        }

        // Create a <rect> element with the specified background color
        const rectElement = svgDocument.createElement('rect');
        rectElement.setAttribute('x', '0');
        rectElement.setAttribute('y', '0');
        rectElement.setAttribute('width', '100%');
        rectElement.setAttribute('height', '100%');
        rectElement.setAttribute('fill', backgroundColor);

        // Get the outermost XML element in the SVG
        const outermostElement = svgDocument.documentElement;

        // Insert the <rect> element as the first child of the outermost element
        outermostElement.insertBefore(rectElement, outermostElement.firstChild);

        // Serialize the modified SVG back to XML
        const serializer = new XMLSerializer();
        const modifiedSvgContent = serializer.serializeToString(svgDocument);

        // Set the response headers
        res.setHeader('Content-Type', 'image/svg+xml');

        // Send the modified SVG as the response
        res.status(200).send(modifiedSvgContent);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

