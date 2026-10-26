# Project notes for Claude

## Images sent by the user

Whenever the user sends an image to be added to a page, always display it **complete / uncropped**, on every device size (desktop, tablet, mobile). Never use CSS that crops it (e.g. `object-fit: cover` against a fixed-height container) unless the container's aspect ratio is made to match the image's own aspect ratio exactly. If there isn't enough height to overlay other content on top of the full image at narrow widths, stack that content below the image instead of cropping the image to fit.
