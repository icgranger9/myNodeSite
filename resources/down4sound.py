## Author Ian Granger ##


import Leap, sys, thread, time
import winsound
from Leap import CircleGesture, KeyTapGesture, ScreenTapGesture, SwipeGesture

class LeapMotionListener(Leap.Listener):
        finger_names = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']
        bone_names = ['Metacarpal', 'Proximal', 'Intermediate', 'Distal']
        state_names = ['STATE_INVALID', 'STATE_START', 'STATE_UPDATE', 'STATE_END']

        def on_init(self, controller):
                print "Initialized"

        def on_connect(self, controller):
                print "Connected"

                controller.enable_gesture(Leap.Gesture.TYPE_CIRCLE);
                controller.enable_gesture(Leap.Gesture.TYPE_KEY_TAP);
                controller.enable_gesture(Leap.Gesture.TYPE_SCREEN_TAP);
                controller.enable_gesture(Leap.Gesture.TYPE_SWIPE);

        def on_disconnect(self, controller):
                print "Disconnected"

        def on_exit(self, controller):
                print"Exit"
        
        def on_frame(self,controller):
                frame = controller.frame()
                if int(frame.id)%15 == 0:
                    print "frame: " + str(frame.id) + " gestures: " + str(len(frame.gestures()))
        
                    for hand in frame.hands:
                        if hand.is_left:
                            for gesture in frame.gestures():
                                if gesture.type == Leap.Gesture.TYPE_SWIPE:
                                    print "Sound Left"
                                    winsound.Beep(1500, 200)
                        else:
                            for gesture in frame.gestures():
                                if gesture.type == Leap.Gesture.TYPE_SWIPE:
                                    print "Sound Right"
                                    winsound.Beep(1000, 200)
                            
def main():
        Listener = LeapMotionListener()
        controller = Leap.Controller()
        
        controller.add_listener(Listener)

        print "Press enter to quit"

        try:
            sys.stdin.readline()
        except KeyboardInterrupt:
            pass
        finally:
                controller.remove_listener(Listener)

if __name__ == "__main__":
   main()
