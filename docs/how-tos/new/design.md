# Designing the use of Canvas Collections

!!! question "How to design the use of Collections for your course?"

	Collections is designed improve the [information architecture](https://xd.adobe.com/ideas/process/information-architecture/information-ux-architect/) of your course site's Modules. Leading to questions like

	1. What is the conceptual model/design intent/information architecture of your course/modules? 
	2. How to best use Collections to make clear and actionable to students?

## Three, not necessarily sequential steps

There is no single, best answer to these questions. No one best process for answering them. The process used here will focus on three steps/questions. Answering these well will likely be an iterative process, rather than sequential. You will decide, experiment, revisit and refine.

The first two questions are the crux and focus on establishing the conceptual model/information architecture for Collections. Changes to these answers can be made, but might be somewhat involved.  Arguably, the first question is the main one to answer. The second can be answered later.

The third question is more practical and Collections enables you to change easily.

The following explains the answers to these questions for the example course. There are quite diverse and detailed methods for answering these questions. Covering those is beyond the scope here.

As you read, think about your course, your context, your design intent, and the outcomes you wish to achieve. How might you answer these questions?

=== "1. What collections?"

	!!! question "What's a good way to group your course's modules?"

	A good answer would be driven by your design intent and context.

	The example course is intended to be self-paced, entirely online course focused on helping people understand and use Canvas Collections. Hence early on in the design three driving questions were identified:

	1. Why use Canvas Collections?
	2. What is Canvas Collections?
	3. How to use Canvas Collections?

	Each of the modules of the course were designed to address aspects of these three questions. Hence it becomes obvious that one collection per question would make sense. It was decided that three collections _Why?_ and _What?_ and _How?_ would be used. This was the initial design of the course.

	Since Collections is both a work in progress, but is also focused on generative the ability for people to easily ask questions and make suggestions was deemed core.  Hence, a much later decision, was made to add a fourth collection: _Questions & Suggestions_. The aim being to make this feature of first order importance to the course design and to "students".

	A part of the sanity check for this set of three/four collections is to map the modules against these collections. To see if all modules fit sensibly into a collection and that no-one collection is too large or too small. Since these three questions underpinned the original design of the modules, happily, this was the case.
	 
	| Collection | Modules |
	| --- | --- |
	| Why? | <ul><li>Improve Canvas' organisation of course content</li> <li> Provide "card interface" functionality in Canvas. </li> <li> Platform for generative development.</li> </ul> |
	| What? | <ul> <li> What is Canvas Collections? </li> <li> What is the student experience? </li> <li> What is the teacher experience?</li> <li> What functionality is provided? </li> </ul> |
	| How? | <ul> <li>How does Canvas Collections work? </li> <li> How do you install Canvas Collections? </li> <li> How do you configure Canvas Collections? </li> <li> How do you design a Blackboard course migration? </li> </ul>  |
	| Questions & Suggestions | <p>This collection ended up without any modules. The aim was to provide direct access to a padlet. This was achieved by using [the _include page_ feature](../../reference/conceptual-model/collections/existing-collections.md#include-page_1) of Collections. </p> |

	!!! note "Basic configuration ready at this point"

		If you're able to prepare a table something like the above, you're ready to [start configuring collections](../configure-collections.md).


	**Another approach - "object" categories**

	Not all courses will have a core set of driving questions and a context in which it makes sense to use the questions as collections. This is in part due to this course not being a "typical" university course.

	A more common approach with a "typical" university courses is the "object" category. Most courses can be said to consist of three common "objects" which students will engage with, for example: 
	
	- weekly content - the lectures, tutorials, activities and resources that form the primary learning experiences.
	- assessment - the more formal formative and summative assessment items that evaluate the quality of student learning.
	- teaching staff and other supports - the people and services providing support to the learning experience.

=== "What objects/activities?"

	!!! question 

		What "objects/activities" do the Canvas modules represent? What extra information do you want to store and display about these objects/activities?

	Canvas modules are a vanilla Canvas object. Canvas only displays standard module information (name, list of items, published or not, progress etc) about modules. In your course, each module will typically represent more design/context specific objects (lecture, assessment item etc).  To make obvious the type of object, you want to be able to associate and display more specific information.

	As a fairly simple course focused more on self-paced information access and not connected to a formal course the modules in the example course aren't representative of something formal like a week, lecture, tutorial, theme.

	Collections provides methods to [add extra information about modules](../../reference/conceptual-model/objects/overview.md). The question here is what type of information is necessary for your course. The answer to this question will be driven by your design intent and context.

	For example, the figure below is an annotated screenshot of the first three "objects" in the _Why?_ collection from the example course. The following table provides a description of the information displayed.

	| Label | Description |
	| --- | --- |
	| Banner (Image\|Video\|Colour) | <p>The card representation includes a banner space in each card. That space can be filled by an image, colour or iframe (embed videos etc). The purpose is to largely provide a visual cue to the specific object.</p> |
	| Date | <p>Provide students with some idea of when a resource is available or should be engaged with, or some other purpose depending on the type of object.</p> |
	| FYI text | <p>For Your Information (FYI) cards are designed to provide information only. Unlike other cards, there is no link from the card to a module. The common use for this is when a module will be available, but is not yet available. It helps make students aware that something is coming. </p> |
	| Description | <p>A short, but more detailed description of the object. Perhaps focused on how, why, when a student should engage with the object.</p> |

	<figure markdown>
	<figcaption>Annotated screenshot of the first three "objects" in the _Why?_ collection from the example course.</figcaption>
	[![](../images/objectsExample.png)](../images/objectsExample.png)
	</figure>

=== "What representation(s)?"
### Reusing metadata in different representations

Collections can use different representations to change visual appearance. For example, the following image (_AssessmentTable_ representation) is the same collection (partially) shown in the above image (_GriffithCards_ representation). It illustrates how a different representation reuses some metadata (description and date) and ignores other metadata (image, engage). It also shows how _additional metadata_ (e.g. _learning outcomes_ and _weighting_ can be used in one representation (assessment table) but ignored in another (Griffith Cards).

![](pics/sameMetaDataAssessment.png)  

### Adding different metadata - please suggest

This support will continue to be expanded over time. In particular, in response to your suggestions. One way to make a suggestion is to [raise an issue describing the suggestion](https://github.com/djplaner/canvas-collections/issues/new) on the Collections repository. 


=== "How best to represent them?"