from django.core.management.base import BaseCommand
from core.models import Lab

LABS = [
    {'name': 'ABB LAB', 'category': 'ROBOTICS', 'description': 'Specialized facility dedicated to industrial robotics, automation, and advanced manufacturing systems using ABB robotic arms.', 'resources': ['2 ROBOT']},
    {'name': 'ADOBE LAB', 'category': 'DESIGN', 'description': 'Dedicated creative workspace for digital media production, graphic design, video editing and multimedia content creation.', 'resources': ['30 MONITOR', '30 CPU']},
    {'name': 'AR/VR LAB', 'category': 'EXTENDED REALITY', 'description': 'Immersive environment for developing and testing augmented and virtual reality applications with cutting-edge headsets.', 'resources': ['6 HEADSETS', '8 WORKSTATION']},
    {'name': 'AUTODESK LAB', 'category': 'DESIGN', 'description': 'Equipped for CAD, 3D modeling, and engineering design with industry-standard Autodesk software suite.', 'resources': ['30 MONITOR', '30 CPU']},
    {'name': 'AWS LAB', 'category': 'CLOUD', 'description': 'Hands-on cloud computing training with Amazon Web Services infrastructure, tools, and certification preparation.', 'resources': ['30 WORKSTATION', '30 CPU']},
    {'name': 'CISCO LAB', 'category': 'NETWORKING', 'description': 'Real-world network configuration, routing, switching, and troubleshooting training with enterprise Cisco hardware.', 'resources': ['20 ROUTER', '20 SWITCH']},
    {'name': 'SMART HOME LAB', 'category': 'IoT', 'description': 'IoT integration, smart devices, home automation protocols, and connected systems training with live setups.', 'resources': ['15 KIT', '15 DEVICE']},
    {'name': 'INDUSTRIAL AUTOMATION LAB', 'category': 'AUTOMATION', 'description': 'Hands-on industrial automation covering robotics, PLCs, process control systems, and Industry 4.0 concepts.', 'resources': ['10 STATION', '5 ROBOT']},
    {'name': 'MICROSOFT LAB', 'category': 'SOFTWARE', 'description': 'Full Microsoft software suite for development, Azure cloud, productivity tools, and certification training.', 'resources': ['30 MONITOR', '30 CPU']},
    {'name': 'NVIDIA LAB', 'category': 'AI / GPU', 'description': 'High-performance GPU workstations for AI research, deep learning model training, and GPU computing.', 'resources': ['20 GPU', '20 WORKSTATION']},
    {'name': 'PLC & SCADA LAB', 'category': 'AUTOMATION', 'description': 'Training on programmable logic controllers, supervisory control, data acquisition, and industrial monitoring systems.', 'resources': ['15 PLC', '10 SCADA']},
    {'name': 'VLSI LAB', 'category': 'ELECTRONICS', 'description': 'Chip design, FPGA programming, simulation, and testing of very large scale integrated circuits.', 'resources': ['20 WORKSTATION', '10 BOARD']},
]


class Command(BaseCommand):
    help = 'Seed the 12 labs matching frontend hardcoded data'

    def handle(self, *args, **options):
        created = 0
        for lab in LABS:
            obj, was_created = Lab.objects.get_or_create(name=lab['name'], defaults=lab)
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f'Seeded {created} new labs ({len(LABS)} total defined).'))
