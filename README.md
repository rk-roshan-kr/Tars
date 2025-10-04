# TARS Exo-Explorer

A web-based application for exploring exoplanets with interactive 3D models, detailed information, and comparison tools.

## Project Structure

- `index.html`: The main landing page for the Exo-Explorer.
- `planet-pages/`: Contains individual planet pages, a template for new pages, and nomenclature documentation.
- `models/`: Stores 3D models (GLB format) for planets.
- `script.js`: Main JavaScript file for global functionalities.
- `style.css`: Main CSS file for global styling.

## Features

- Interactive 3D models of exoplanets.
- Detailed information on planetary characteristics, discovery history, and orbital dynamics.
- Earth comparison tool for size and property comparison.
- Responsive design for various devices.
- Dynamic starfield backgrounds.
- Nomenclature guide for astronomical terms.

## Setup and Running

To run this project locally, you need a web server. Python's built-in HTTP server is a convenient option.

1.  **Navigate to the project root directory:**

    ```bash
    cd "d:\NASA\TARS EXO EXPLOERER"
    ```

2.  **Start the HTTP server:**

    ```bash
    python -m http.server 8080
    ```

3.  **Open in browser:**

    Once the server is running, open your web browser and navigate to `http://localhost:8080`.

## Planet Pages

Individual planet pages are located in the `planet-pages/` directory. Each page is generated from `planet-template.html` and includes specific data for each exoplanet.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

Project Repository: <https://github.com/rk-roshan-kr/Tars>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details (if applicable).