package aircracker

import (
	"bytes"
	"os/exec"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Interface struct {
	Name string
	Mode string
	Info string
}


// Enumerate available wireless network interfaces
// Returns a list of (Interface) objects
func (a *App) GetInterfaces() ([]Interface, error) {
	runtime.LogInfo(a.ctx, "Enumerating wireless interfaces using iwconfig")

	cmd := exec.Command("iwconfig")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return nil, err
	}

	var interfaces []Interface

	entries := strings.Split(out.String(), "\n\n")
	for _, entry := range entries {
		if entry == "" || strings.Contains(entry, "no wireless extensions") {
			continue
		}
		fields := strings.Fields(entry)
		ifname := fields[0]
		ifmode := "N/A"
		ifinfo := entry
		for _, field := range fields {
			if after, ok := strings.CutPrefix(field, "Mode:"); ok  {
				ifmode = after
			}
		}

		var newif Interface = Interface{ ifname, ifmode, ifinfo }
		interfaces = append(interfaces, newif)
		runtime.LogInfof(a.ctx, "Interface: %s, Mode: %s", ifname, ifmode)
	}
	return interfaces, err
} 


