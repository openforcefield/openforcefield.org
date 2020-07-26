# Use Paged.js inside Hugo the easy way :)

Paged.js is a library that transforms HTML and CSS into beautiful paginated document, ready to be printed or saved as PDF. If you want to know more about Paged.js, please go to [https://www.pagedjs.org]
This project is an implementation for the static site generator Hugo.

## Install component as a submodule

```sh
git submodule add https://gitlab.pagedmedia.org/julientaq/pagedjs-hugo.git themes/pagedjs
```

To update the component

```sh
git submodule update --remote themes/pagedjs
```


## Using the plug-in

If you want to use the component, you need to add two partials: 

- `pagedjs-header.html` in the `<head>` of the template using `{{ partial "pagedjs-header.html" . }}`.
- `print-button.html` as the first element of the body to fix it top right of the page, using `{{ partial "print-button.html" }}`.

## Styling your css

The paged.js module includes a couple of CSS files to work:

- `theme/pagedjs/assets/css/print.css` that contains the styles used for printing (setting up the page size, the running heads, etc.). If you want to change how the PDF will look once printed, you can check [https://www.pagedjs.org](https://www.pagedjs.org).
- `theme/pagedjs/assets/css/pagedjs.css` to define the `#Print` button css properties;
- `theme/pagedjs/assets/css/interface.css` that offer the minimum styles to have a book-looking preview on screen.

If you want to use your own style, you can create a `print.css`, a `pagedjs.css` or a `interface.css` in your Hugo’s project `assets/css/` directory, or, if your making a theme, in the `themes/name-of-the-theme/assets/css/`. Modifying any of the provided CSS files will make it harder to update when new version of paged.js is released.


## License

MIT