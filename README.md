# Arcana Light - A Clean Homepage #

A keyboard (or mouse) driven homepage designed to be simple and show only the essentials.

Comes with a companion python script that allows for easier managing. 

All configuration options can be found in the __js/settings.js__ file.

If you would like to easily add / remove categories or links, then check out 
the companion python script named *settings.py*. You can find it in the root directory of this 
homepage.

## Weather ##

The weather is shown in the top right of the screen. You can change it
to match your location through the __js/settings.js__ file.

## News ##

This uses the newsapi.org API in order to pull in head lines.

## Categories ##

Categories can be added through the settings.js file or through the settings.py command line
utility. The icon should be the name of a font awesome icon. When the categories are generated, the "fa-" is automatically prepended to
the icon name found in the settings file. 

Links are defined within the categories. The full url is expected for the link field (including
the http://). The name can be whatever. It is what is shown in the interface. 

You can easily add a new category with:

``` bash
./settings.py category add icon-name
```

You should replace "icon-name" with the actual name of the Font Awesome icon

## Key Shortcuts ##

This start page was design with keyboard shortcuts in mind. To access any of the categories, you can press the number 1-10.
The first category could be selected with a "1", the next category with a "2", and so on.

Once you have selected a category, you can move up and down the links through the arrow keys. Alternatively you can use the "j" and "k" key.

| Key Shortcut | Use |
--------------------------
| 1-10 | Open a category |
| j/k  | Move up and down through the links |
| alt + enter | Focus the search bar |

## Credits ##

Design based on Here & Now and Spectrum

The background video comes from Reddit - http://reddit/r/cineography/???

The following libraries are used:

* Mousetrap
* Font Awesome
* Simple Weather

There libraries can be found in their respective directory in the  __vendor__ directory.

