import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get('/:projectId', async (req, res) => {
    const project = await prisma.project.findUnique({
        where: { id: req.params.projectId }
    })
    res.send(project)
})

router.post('/', async (req, res) => {
    const data = req.body as {
        projectName: string;
    };
    const project = await prisma.project.create({
        data: {
            projectName: data.projectName
        },
    });

    res.json({ message: 'Project created!' })
});

router.post('/:projectId/brainstorm', async (req, res) => {
    const data = req.body as {
        prompts: string[]
        frontend: string[]
        backend: string[]
        database: string[]
    };
    const brainstorm = await prisma.brainStorm.create({
        data: {
            projectId: req.params.projectId,
            prompts: data.prompts,
            frontend: data.frontend,
            backend: data.backend,
            database: data.database
        }
    });

    res.json({ message: `Brain Storm Entry made for project ID ${req.params.projectId}` });
});

router.get('/:projectId/brainstorm', async (req, res) => {
    //not sure if it should be findFirst or findUnique
    const brainstorm = await prisma.brainStorm.findFirst({
        where: { projectId: req.params.projectId },
    });

    res.send(brainstorm);
});

router.post('/:projectId/phase/:phaseNum', async (req, res) => {
    const data = req.body as {
        phaseName: string,
        phaseDescription: string,
    };

    const phase = await prisma.phase.create({
        data: {
            projectId: req.params.projectId,
            phaseNum: parseInt(req.params.phaseNum),
            phaseName: data.phaseName,
            phaseDescription: data.phaseDescription,
        }
    })

    res.json({ message: `Phase ${req.params.phaseNum} of project ${req.params.projectId} has been created` })
});

router.get('/:projectId/phase/:phaseNum', async (req, res) => {
    const phase = await prisma.phase.findFirst({
        where: {
            projectId: req.params.projectId,
            phaseNum: parseInt(req.params.phaseNum),
        }
    });
    res.send(phase)
});

router.post('/:projectId/phase/:phaseId/task/:taskId', async (req, res) => {
    const data = req.body as {
        assignees: string[],
        description: string
    };

    const task = await prisma.task.create({
        data: {
            assignees: { connect: data.assignees.map(assignee => ({ id: assignee })) },
            description: data.description,
            phaseId: req.params.phaseId,
        }
    });

    res.json({ message: `Task ${req.params.taskId} of phase ${req.params.phaseId} has been created` })
});

router.get('/:projectId/phase/:phaseId/task/:taskId', async (req, res) => {
    const task = await prisma.task.findFirst({
        where: {
            phaseId: req.params.phaseId,
            id: req.params.taskId
        }
    });
    res.send(task)
});

export default router
