// import { plainToInstance } from 'class-transformer'
// import { Request, Response, NextFunction } from 'express'
// import { HTTPStatusCode } from '../../constants/http'

// export async function httpCreateUserPost(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const post = req.body
//     const postCreated = await postService.createUserPost(post)
//     const postCreatedDTO = plainToInstance(PostDTO, postCreated.generatedMaps, {
//       excludeExtraneousValues: true
//     })
//     res.status(HTTPStatusCode.Created).json(postCreatedDTO)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function httpUpdateUserPost(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const { uuid } = req.params
//     const post = req.body
//     const postUpdated = await postService.updateUserPost(uuid, post)
//     const postUpdatedDTO = plainToInstance(PostDTO, postUpdated.generatedMaps, {
//       excludeExtraneousValues: true
//     })
//     res.status(HTTPStatusCode.Ok).json(postUpdatedDTO)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function httpDeleteUserPost(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const { uuid } = req.params
//     await postService.deleteUserPost(uuid)
//     res.status(HTTPStatusCode.NoContent).send()
//   } catch (error) {
//     next(error)
//   }
// }
