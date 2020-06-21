---
title: Introduction to AWS Lambda
slug: "intro-to-aws-lambda"
date: "2018-09-09"
description: "Most enterprise companies are focusing on on-demand services or pay as you go services. Companies don't want to pay for the ideal time. In a traditional way, if a company want to host their application on to the cloud, the company have to buy a server. Servers are costly and cost depends on the configuration of the server also company have to maintain that server. All these things are increasing the operation cost of the company."
---

As we know things are changing so fast. Most enterprise companies are focusing on on-demand services or pay as you go services. Companies don't want to pay for the ideal time. In a traditional way, if a company want to host their application on to the cloud, the company have to buy a server. Servers are costly and cost depends on the configuration of the server also company have to maintain that server. All these things are increasing the operation cost of the company.

In the market, There are big companies like Google, Amazon, Microsoft trying to solve the operational cost problem. Hence Amazon comes with the solution of AWS Lambda.

Now the question is that what is AWS Lambda? and how does it solve the operational cost issue? Let's dive into AWS Lambda step by step.

**What is AWS Lambda?**

AWS Lambda is a service provided by Amazon. In a simpler way, you have to store your function on to cloud and trigger stored function with events like API calls, database modifications and many more etc. Behind the scene, Amazon manages running servers handling function execution and needed resources to successfully complete function execution.

**How does it work?**

First, you have to upload your code to AWS Lambda then setup trigger for invoking that function. Once function invoked, rest of the computing resources handled by AWS Lambda itself.

Let's focus on the advantages and limitation of AWS Lambda.

(Note: This article is not sponsored by AWS, So article will truly mention the realistic advantages and limitation of AWS Lambda)

**Advantages and limitation of AWS Lambda**

1. No servers to manage - I completely agree with AWS that managing servers are a daunting task required a specialized team. For small companies, it's a deserving big value.
1. Continuous scaling - Definitely AWS Lambda take care of need resources and continuous scaling as a server to successfully running function. This overcome headache of scaling application and also we can allow or prevent the function from accessing resources.
1. Reduce operational cost - One of the biggest strengths of AWS Lambda functions is the reduced cost of execution. You don't pay anything when your code isn't running. The most application has 60-40% API rule means that 60% API are rarely called and 40% API are frequently gets called it will increasing cost for 40% lambda functions and remaining 60% lambda functions cost will be normal.
1. Architectural complexity - Implementing CI & CD pipeline with AWS Lambda cumbersome to manage too many functions and ignoring granularity will end up creating mini-monoliths. And also what about code reusing, design pattern, testing lambda functions, and the local development process are much harder to maintain as compared to traditional client-server architecture. There are AWS SAM and Serverless framework it doesn't help you in maintaining source code design pattern, build code for a different environment and deploying an application with deployment staging.
1. Long-running processes - If you have a long-running process (a function that runs for more than 5 minutes), AWS Lambda is probably not for you because that’s the maximum execution time at the moment. However, you can do a recursive invocation as a workaround for the long-running process.
1. Programming languages - AWS Lambda supports following programming languages: Node.js (JavaScript), Python, Java (Java 8 compatible), and C# (.NET Core) and Go. If your team have different skill sets then you have to forcibly switch to a supported language.
1. Cold startup (startup latency) - Serverless architecture executes commands and functions on temporarily created containers. When you invoke function call then Lambda have to first establish an environment to execute that function. If continuously running function have not required to establish an environment but if some functions are rarely invoked then it took more than few(5-6) seconds for a response and it varied from one request to another.
1. Concurrent running lambda functions - Currently one AWS account can run 1000 lambda function concurrently. If your application is big your application needed more than 1000 lambda functions running concurrently then you have to manage another account for the handling other functions calls.
1. Security and bug related issue - If a hacker finds out that your company usages AWS lambda functions for handling computation tasks then hacker might do a denial-of-service attack (DoS attack) to increase the cost of lambda functions. Another case is that due to a bug in application some function gets called lambda function recursively then its might increase cost.
1. Vendor control and vendor lock-in - One of the issues about using AWS Lambda is that the third-party applications used or the Hardware and Software patches etc. all get to be decided by AWS. Thus, working with AWS Lambda means giving away a lot of control over your application.
1. Computational restrictions - Being based on these temporarily created containers, the usable memory is limited to about 2GB of RAM and the time to about 5 minutes for your Lambda to execute. This means that functions which require a lot of processing cannot be handled by AWS Lambda.
1. Issues with working in a virtual private cloud (VPC) - Many clients use a Virtual Private Cloud (VPC) for applications or processes which need an extra layer of security. However, if your Lambda needs to work with any such function which resides within a VPC, it cannot then talk to any other resources which are outside the VPC. In such cases, using AWS Lambda also entails some additional delay over and above the cold start mentioned above as the VPC creates something called ENIs or Elastic Network Interfaces for security purposes and this takes some time.

I have faced this advantages and limitation when working with AWS Lambda. Have you faced any of these issues? What are the typical workarounds you use? I’d love to know what your thoughts about AWS Lambda are, so please do comment below and share your thoughts

I hope you have like this article, don't forget to hit clap or like.
