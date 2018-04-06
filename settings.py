#!/usr/bin/python

import json
import click

def settings_to_json(settings):
    return json.dumps(settings, indent=4)


def json_to_settings(raw):
    return json.loads(raw)

def write_settings_to_file(raw):
    header = "var settings = " + raw + ";"
    with open("js/settings.js", "w+") as f:
        f.write(header)

def read_settings_from_file():
    with open("js/settings.js") as f:
        raw = f.read().replace("var settings = ", "").replace(";", "")
        return json_to_settings(raw)

@click.command("add-category")
@click.argument("icon")
def add_category(icon):
    settings = read_settings_from_file()
    settings['category'].append({
        'icon' : icon,
        'links' : []
    })
    write_settings_to_file(settings_to_json(settings))

@click.command("show")
def show_categories():
    settings = read_settings_from_file()
    for i in range(0, len(settings['category'])):
            print("{} - {}".format(i, settings['category'][i]['icon']))

@click.command("show-links")
@click.argument("category")
def show_links(category):
    settings = read_settings_from_file()
    for i in range(0, len(settings['category'][int(category)])):
        print(settings)
        link = settings['category'][int(category)]
        print("{} - {}".format(link['name'], link['link']))

@click.command("add-link")
@click.argument("category")
@click.argument("name")
@click.argument("link")
def add_link(category, name, link):
    settings = read_settings_from_file()
    settings['category'][int(category)]['links'].append({
        "name" : name,
        "link" : link
    })
    write_settings_to_file(settings_to_json(settings))

@click.group()
def settings():
    pass

settings.add_command(add_category)
settings.add_command(add_link)
settings.add_command(show_categories)
settings.add_command(show_links)

if __name__ == "__main__":
    settings()
