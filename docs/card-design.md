# Card Design

Document thinking and experiments with design of the Module cards, including
- Microsoft's Adaptive Cards
- Bootstrap


## Microsoft's Adaptive Cards

[Microsoft's Adaptive Cards](https://adaptivecards.io/) provide a platform-agnostic way to specify Cards in JSON and provide renderers for various platforms, including [Javascript](https://docs.microsoft.com/en-gb/adaptive-cards/sdk/rendering-cards/javascript/getting-started).

However, the JavaScript renderer doesn't solve the problem of HTML design, we still need to
1. Design the make up of the individual cards
2. Design the CSS to represent and individual card
3. Design the CSS to represent groups of cards

i.e. provides a lot of functionality I wasn't thinking of using, without solving the problem of me avoiding any need for CSS design.

On the plus side, the JSON that is produced could in theory be exported into other platforms that support adaptive cards (e.g. Teams)

## Bootstrap

[Bootstrap's cards](https://getbootstrap.com/docs/4.0/components/card/) provide an apparently reasonably close functional approximation.
