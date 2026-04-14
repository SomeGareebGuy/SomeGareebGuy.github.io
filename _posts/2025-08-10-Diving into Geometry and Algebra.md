---
title: Diving into Geometry and Algebra
date: 2025-08-10T07:46:30-04:00
categories:
  - blog
tags:
  - Paper Review
---
Throughout my summer vacation, I tried to get into abstract algebra, learning about Group and Ring Theory from [_Dummit and Foote_](https://www.amazon.in/Abstract-Algebra-3ed-David-Dummit/dp/8126532289). The process was long and often challenging, but over time, the pieces began to fit together.

When I returned to campus this semester, I approached my Linear Algebra professor to ask if there were any projects I could work on at my level. He cautioned me that attempting advanced mathematics without a solid foundation could do more harm than good. Still, after a bit of persuasion, he handed me a single page  

> [_"Note on Nuclei and Affine Blocking Sets"_](https://www.sciencedirect.com/science/article/pii/0097316594900167#aep-bibliography-id5) by Aart Blokhuis.

That was last Wednesday. For several days, I didn’t dare open it—the very first line contained the words '_affine_' and '_Desarguesian_', which made it seem like an insurmountable wall. But when I finally started reading on Monday, I realized that this was something I might actually be able to work through on my own.

With guidance from the professor’s TA (Satya bhaiya), I picked up [ _Incidence Geometry_](http://ericmoorhouse.org/handouts/Incidence_Geometry.pdf) by G. Eric Moorhouse for a basic introduction to the field. On his advice, I also explored symmetric polynomials through Jian Zhou’s  [_"Introductions to Symmetric Polynomials and Symmetric Functions"_](http://www.cms.zju.edu.cn/UploadFiles/AttachFiles/200431742910799.pdf).

# Part I: Nuclei and Affine Blocking Sets

## Understanding Affine planes and what makes them special.

Moorhouse describes affine planes as 

> An affine plane is an incidence system of points and lines such that
	(AP1) For any two distinct points, there is exactly one line through both.
	(AP2) Given any line l and any point P not on l, there is exactly one line through P
		that does not meet l.
	(AP3) There exist four points such that no three are collinear.

Now, for an affine plane
