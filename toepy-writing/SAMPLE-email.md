---
title: "SAMPLE — toepy voice in email + chat"
note: "Demo output proving the voice transfers beyond blog posts. Not real toepy writing."
---

## Email

Subject: Question about the sales dashboard

Hi Maria,

I think we are looking at the wrong metric on the sales sheet. Total revenue
goes up every quarter, but that is like measuring a whale by its splash —
the interesting part is underneath.

My guess: repeat customers are carrying the growth, and new business is
actually flat. Probably we should split the KPI into two tiles and see.

I made a quick version in the dev app (sheet "Split test"). Could you take a
look and tell me if I'm reading this right?

Thanks!

Patrick

## Chat reply

> should we show both charts or pick one?

Pick one I think. Two charts next to each other is like telling the story
twice — people stop listening the second time. The trend chart is the nice
one, I'd keep that.

## Code review comment

This works, but I guess the loop will get slow on big files — we are reading
the whole table for every row. Probably a peek() before the loop solves it.
Nice find on the date format by the way, that was the tricky part here.

## Announcement

The demo environment will be closed at the end of this month. If you still
need your test apps, download them before Friday.

Best,

Patrick
