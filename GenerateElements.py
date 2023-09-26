# Dati della tabella
table_data = [
    {
        'Nome': 'Metatag Generator',
        'Color': '#bbe0dd',
        'Link': 'https://www.opengraph.xyz/',
        'Description': 'Test',
    },
    {
        'Nome': 'Metatag ',
        'Color': '#FF0000',
        'Link': 'https://www.opengraph.xyz/',
        'Description': 'ProvaBrother',
    },
    # Aggiungi altre righe della tabella qui
]

# Apri un file HTML per scrivere l'output
with open('output.html', 'w') as output_file:
    # Inizia a scrivere l'intestazione HTML
    output_file.write('<html>\n<head>\n</head>\n<body>\n')

    # Itera attraverso i dati della tabella
    for row in table_data:
        output_file.write('  <div data-cursor-text="Open" class="square" style="background-color: {color};"><a target="_blank" href="{link}"><img src="">{nome}</a> \n'.format(
            color=row['Color'],
            link=row['Link'],
            nome=row['Nome']
        ))
        output_file.write('    <span style="background-color: {color};">{descrizione}</span>\n'.format(
            color=row['Color'],
            descrizione=row['Description']
        ))
        output_file.write('  </div>\n')

    # Concludi l'HTML
    output_file.write('</body>\n</html>')

print("File HTML generato con successo: output.html")
