---
title: Diving into Geometry and Algebra
date: 2026-05-15T16:57:00-04:00
categories:
- blog
tags:
- Paper Review
---

  

Throughout the summer vacation of 2025, I tried to get into abstract algebra, learning about Group and Ring Theory from [_Dummit and Foote_](https://www.amazon.in/Abstract-Algebra-3ed-David-Dummit/dp/8126532289). The process was long and often challenging, but the biggest issue was keeping up and reading days and days of algebra.

When I returned to campus this semester, I approached my Linear Algebra professor to ask if there were any projects I could work on at my level. He cautioned me that attempting advanced mathematics without a solid foundation could do more harm than good. Still, after a bit of persuasion, he handed me a single page.

> [_"Note on Nuclei and Affine Blocking Sets"_](https://www.sciencedirect.com/science/article/pii/0097316594900167#aep-bibliography-id5) by Aart Blokhuis.

That was last Wednesday (6th August). For several days, I didn’t dare open it as the very first line contained the words '_affine_' and '_Desarguesian_', which made it seem like an insurmountable wall. But when I finally started reading on Monday (11th Aug), I realised that this was something I might actually be able to work through on my own.

With guidance from the professor’s TA (Satya bhaiya), I picked up [_Incidence Geometry_](http://ericmoorhouse.org/handouts/Incidence_Geometry.pdf) by G. Eric Moorhouse for a basic introduction to the field. On his advice, I also explored symmetric polynomials through Artin's book.

This paper review was a long series of presentations I gave to my professor as he advised me on what to read next. In one of the discussions, he pointed out that I need much more theoretical knowledge rather than a ChatGPT-ish one, where I only understand a specific part. This is also why most of what will be found here are screenshots of book axioms, descriptions and theorems.

## Part I: Nuclei and Affine Blocking Sets
  
### Understanding Affine planes and what makes them special

First of all, one must define the system we are going to use, which will be incidence geometry. Moorhouse's definition is really helpful in that.

![Alt text](/assets/images/Post1_1.png)  

We informally say that _P_ lies on _ℓ_ and on _m_, but not on _n_ or _r_; also _ℓ_ passes through _P, Q, S, T_ but not _R_; etc.  

Now, for understanding what an affine plane is, we use [Gary Ebart and Susan Bawick's book](https://link.springer.com/series/3733) and first define a projective plane.

![Alt text](/assets/images/Post1_3.png)

Let V be a ___(d + 1)-dimensional___ vector space over some field (or skew field) ___F___, for any integer ___d ≥ 2___. Take as ___points___ the ___one-dimensional___ subspaces of V, as ___lines___ the ___two-dimensional___ subspaces of V, as ___planes___ the ___three-dimensional___ subspaces of V,as ___solids___ the ___four-dimensional___ subspaces of V, ...,and as ___hyperplanes___ the ___d-dimensional___ subspaces of V. Then, using containment of subspaces, the resulting structure satisfies the axioms for a projective geometry of dimension ___d___, called the ___classical projective geometry___ of dimension ___d___ and denoted by ___PG(d,F)___. If ___F___ is a finite field, so that ___F = GF(q)___ for some prime power q, then we obtain a finite projective geometry, denoted by ___PG(d,q)___.

Removing any hyperplane and all subspaces contained in it from
___PG(d,F)___ will produce a classical affine geometry of dimension ___d___, denoted by ___AG(d,F)___ or simply ___AG(d,q)___ when ___F = GF(q)___.

![Alt text](/assets/images/Post1_2.png)

Some further properties of an affine plane can be derived from the definition as given below.

![Alt text](/assets/images/Post1_6.png)

I also thought about writing some code, so I generated all points and lines of ___AG(2, 5)___ .

    # The points in this case are 2-degree coordinates (a, b) such that a, b < 5.
    import pandas as pd
    points = []
    for a in  range(5):
        for b in  range(5):
            points.append((a, b))
    
    # Generate data for the 5x5 table display
    table_rows = []
    for i in  range(5):
        row_values = []
        for j in  range(5):
            row_values.append(f"({i}, {j})")
            table_rows.append(row_values)
    
    # Create a DataFrame for the 5x5 table visualization
    df_points_5x5 = pd.DataFrame(table_rows,
        index=[f"a={i}"  for i in  range(5)],
        columns=[f"b={j}"  for j in  range(5)])
    
    print("Points of AG(2, 5) in a 5x5 table:")
    display(df_points_5x5)

![Alt text](/assets/images/Post1_4.png)

Then, as each line must have 5 points, we can take a set containing 5 points; this set will be the line. Now, we say that two lines are parallel if they don't share a point. Taking all the lines available in the set, we get 6 parallel classes. No need to worry about the roots of unity part, since we will be covering that topic later.

![Alt text](/assets/images/Post1_5.png)

Thus far, we know what an affine plane ___AG(2, q)___ is, but we still haven't defined what Desarguesian means, so let's directly jump there.

![Alt text](/assets/images/Post1_6.png)

But this theorem only becomes important in a very indirect sense. This is because even though a ___Desarguesian plane___ implies a plane that satisfies Desargues' theorem, it also tells us that it is a ___classical projective plane___. This is because a result involving a ___Desargues' configuration___ holds in a projective geometry if and only if the projective geometry arises from a vector space over a skew field; that is, if and only if the projective geometry is ___classical___.

The projective planes isomorphic to some ___PG(2, F)___ are called ___classical projective planes___ or ___field planes___.

And thus, now we understand the first line of the given paper.

> Let A = AG(2, q) be the Desarguesian affine plane of order q.

Thanks a lot for reading this far.

On some last notes: I started writing this on 10th of August last year and that was also when I was actually reading this paper, trying to understand it and discussing it with the TAs. As of writing this now, I didn't secure any internships anywhere, didn't give NBHM and my score in JAM was also nothing to write home about, but I am still breathing. Life can be at an all time low but I will continue doing this lol.

I am writing it this late since I didn't get much free time plus one of the last presentations I gave 2 days ago and it still went pretty bad ngl. I am surprised for how long I have studied and got something new out of this paper so far. Also I didn't want to type out so much of the same stuff again and again, but I think this typing plus screenshot style works for me.

Fin.
